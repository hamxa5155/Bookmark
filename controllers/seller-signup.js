const stripe = require('stripe')('sk_test_51FqlsqAGoo5IVReQ3d11WTgqmSXkMEhdh9zwuKnFyx43sUbrWkABoHqWwZZQcXqrV3kVfNuI0DqBP9oEAm8WCJTY00G19EzVtH', { apiVersion: '' });

const getAccountLink = async(accountId, type) => {
    try {
        //TODO: Refresh and return URLs are all hardcoded to production URLs; for some reason the environment variables aren't working really
        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: 'https://bookmarkdofficial.com/sell',
            return_url: 'https://bookmarkdofficial.com/sell',
            type: type
        });
        return accountLink.url;
    } catch(err) {
        throw (err);
    }
}

module.exports = (app, authRequired) => {
    app.get('/create-seller', authRequired, async(req, res) => {
        if (!req.user.stripeSellerId) {
            try {
                const account = await stripe.accounts.create({
                    type: 'custom',
                    country: 'US',
                    email: req.user.email,
                    requested_capabilities: [ 'card_payments', 'transfers' ],
                    business_type: 'individual',
                    individual: {
                        first_name: req.user.firstName,
                        last_name: req.user.lastName,
                    //     dob: {
                    //         day: parseInt(req.user.dob.getDate()),
                    //         month: parseInt(req.user.dob.getMonth()),
                    //         year: parseInt(req.user.dob.getFullYear())
                    //     },
                    //     phone: req.user.phone,
                        email: req.user.email
                    }
                });
                const accountLinkURL = await getAccountLink(account.id, 'custom_account_verification');
                req.user.stripeSellerId = account.id;
                await req.user.save();
                res.json({ accountLinkURL });
            } catch(err) {
                res.json({ err });
            }
        } else {
            res.json(null);
        }
    });

    app.get('/update-seller', authRequired, async(req, res) => {
        try { 
            const accountLinkURL = await getAccountLink(req.user.stripeSellerId, 'custom_account_update');
            res.json({ accountLinkURL });
        } catch (err) {
            res.json({ err });
        }
    });

    app.get('/seller-account', authRequired, async(req, res) => {
        try {
            const account = await stripe.accounts.retrieve(req.user.stripeSellerId);
            res.json({ account });
        } catch(err) {
            res.json({ err });
        }
    });

    app.post('/add-banking-info', authRequired, async(req, res) => {
        try {
            const account = await stripe.accounts.createExternalAccount(req.user.stripeSellerId, {
                external_account: {
                    object: 'bank_account',
                    country: 'US',
                    currency: 'usd',
                    account_holder_name: `${req.user.firstName} ${req.user.lastName}`,
                    account_holder_type: 'individual',
                    routing_number: req.body.routingNumber,
                    account_number: req.body.accountNumber
                }
            });
            res.json({ account });
        } catch (err) {
            res.json({ err });
        }
    });
}
