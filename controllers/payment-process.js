const fetchUrl = require('fetch').fetchUrl;
const axios = require('axios');
const Chat = require('../models/chat');
const User = require('../models/user');
const stripe = require('stripe')('sk_test_51FqlsqAGoo5IVReQ3d11WTgqmSXkMEhdh9zwuKnFyx43sUbrWkABoHqWwZZQcXqrV3kVfNuI0DqBP9oEAm8WCJTY00G19EzVtH', { apiVersion: '' });

const checkCartItemAvailablity = async(user, cartPayInfo) => {
    const inavailableCartItems = [];
    await Promise.all(cartPayInfo.map(async(payObj) => {
        const elasticRes = await axios.get(`http://3.83.55.90:9200/products/_source/${payObj.id}`)
        .catch((err) => {
            inavailableCartItems.push(payObj.isbn);
        });

        if (!elasticRes.data.isForSale) {
            user.cartItems = user.cartItems.filter((cartItem) => (cartItem != payObj.id));
            inavailableCartItems.push(payObj.isbn);
        }
    }));
    await user.save();
    return inavailableCartItems;
}

const createNewChat = async(payObj, seller, user, paymentId) => {
    const newChat = new Chat({
        isbn: payObj.isbn,
        productId: payObj.id,
        paymentId,
        price: payObj.price,
        isCancelled: false,
        buyerComplete: false,
        sellerComplete: false,
        sellerEmail: seller.email,
        sellerName: `${seller.firstName} ${seller.lastName}`,
        buyerEmail: user.email,
        buyerName: `${user.firstName} ${user.lastName}`
    });

    await newChat.save();
    seller.chats.push(newChat._id);
    user.chats.push(newChat._id);
}

const updateProduct = async(productId, config) => {
    let elasticRes;
    if (config.isSold) {
        elasticRes = await axios.post(`http://3.83.55.90:9200/products/_update/${productId}?filter_path=result`, {
            "script": `ctx._source.isSold=${config.isSold}`
        }).catch((err) => {
            return false;
        });

        if (elasticRes.data.result !== 'updated') {
            return false;
        }

        config.isForSale = false;
    }

    elasticRes = await axios.post(`http://3.83.55.90:9200/products/_update/${productId}?filter_path=result`, {
        "script": `ctx._source.isForSale=${config.isForSale}`
    }).catch((err) => {
        return false;
    });

    if (elasticRes.data.result === 'updated') {
        return true;
    } else {
        return false;
    }
}

module.exports = (app, authRequired) => {
    app.post('/payment-process', authRequired, async(req, res) => {
        const inavailableCartItems = await checkCartItemAvailablity(req.user, req.body.cartPayInfo);
        if (inavailableCartItems.length > 0) {
            res.json({ err: `Cart item with the ISBNs (${inavailableCartItems.join(', ')}) have already been purchased. They will now be removed from your cart. Please try purchasing again`})
        } else {
            try {
                // Sends requests to Square to complete payments for user items
                await Promise.all(req.body.cartPayInfo.map((payObj) => (
                    new Promise((resolve, reject) => {
                        fetchUrl('http://connect.squareupsandbox.com/v2/payments', {
                            method: 'post',
                            headers: {
                                'Square-Version': '2020-04-22',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer EAAAEN9r7-vjl7-We1XAQH9aokwAEXz_o0YomsU1bfkT__06yMnBlsCcFOT1_PCi'
                            },
                            payload: JSON.stringify({
                                amount_money: {
                                    amount: payObj.price,
                                    currency: 'USD'
                                },
                                idempotency_key: `PAY-${payObj.id}-${req.user._id}`.substring(0, 45),
                                source_id: req.body.nonce,
                                autocomplete: true
                            })
                        }, async(err, meta, body) => {
                            if (err) {
                                reject(err)
                            } else {
                                const squareRes = JSON.parse(body.toString());
                                
                                if (squareRes.payment) {
                                    const seller = await User.findById(payObj.seller)
                                    .catch((err) => {
                                        reject(null);
                                    });

                                    if (!seller) {
                                        reject(null);
                                    }

                                    await createNewChat(payObj, seller, req.user, squareRes.payment.id);

                                    if (!await updateProduct(payObj.id, { isForSale: false })) {
                                        reject(null);
                                    };
                                    
                                    // Set up payments and remove from cart and update receiptUrls
                                    req.user.pastTransactionUrls.push(squareRes.payment.receipt_url);
                                    req.user.payments.push(squareRes.payment.id);
                                    req.user.cartItems = [];
                                    await req.user.save();
                                    seller.pastTransactionUrls.push(squareRes.payment.receipt_url);
                                    await seller.save();

                                    resolve(squareRes.payment);
                                } else {
                                    reject(squareRes);
                                }
                            }
                        });
                    })
                )));
                res.json({ isPaymentSuccess: true });
            } catch(err) {
                res.json(err);
            }
        }
    });

    app.post('/payment-refund', authRequired, async(req, res) => {
        try {
            const chat = await Chat.findById(req.body.chatId)
            .catch((err) => reject(null));

            await new Promise((resolve, reject) => {
                fetchUrl('http://connect.squareupsandbox.com/v2/refunds', {
                    method: 'post',
                    headers: {
                        'Square-Version': '2020-04-22',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer EAAAEN9r7-vjl7-We1XAQH9aokwAEXz_o0YomsU1bfkT__06yMnBlsCcFOT1_PCi'
                    },
                    payload: JSON.stringify({
                        idempotency_key: `REF-${chat.paymentId}-${req.user._id}`.substring(0, 45),
                        amount_money: {
                            amount: chat.price,
                            currency: 'USD'
                        },
                        payment_id: chat.paymentId
                    })
                }, async(err, meta, body) => {
                    if (err) {
                        reject(err);
                    } else {
                        const squareRes = JSON.parse(body.toString());

                        if (squareRes.refund) {
                            const buyer = await User.findOne({ email: chat.buyerEmail })
                            .catch((err) => reject(null));

                            if (!buyer) {
                                reject(null);
                            }

                            buyer.refunds.push(squareRes.refund.id)
                            await buyer.save();

                            chat.isCancelled = true;
                            await chat.save();

                            if (!await updateProduct(chat.productId, { isForSale: true })) {
                                reject(null);
                            };

                            res.json({ isRefundSuccess: true });
                        } else {
                            reject(squareRes);
                        }
                    }
                });
            })
        } catch(err) {
            res.json(err);
        }
    });

    app.post('/payment-complete', authRequired, async(req, res) => {
        try {
            const chat = await Chat.findById(req.body.chatId)

            if (req.user.email === chat.buyerEmail) {
                chat.buyerComplete = true;
            } else if (req.user.email === chat.sellerEmail) {
                chat.sellerComplete = true;
            }

            await chat.save();

            if (!(chat.buyerComplete && chat.sellerComplete)) {
                res.json({ markCompleteSuccess: true });
            } else {
                const seller = await User.findOne({ email: chat.sellerEmail })
                .catch((err) => reject(null));

                const stripeRes = await stripe.paymentIntents.create({
                    amount: chat.price,
                    currency: 'usd',
                    receipt_email: seller.email,
                    transfer_data: {
                        destination: seller.stripeSellerId,
                        amount: parseInt(chat.price * 0.95)
                    }
                });

                seller.payments.push(stripeRes.id);

                if (!await updateProduct(chat.productId, { isSold: true })) {
                    reject(null);
                };

                const productObj = seller.products.find((product) => (product.id === chat.productId));
                productObj.isSold = true;
                await seller.save();

                res.json({ transactionSuccess: true });
            }
        } catch(err) {
            res.json(err);
        }
    });
}