const axios = require('axios');
const imageDispatcher = require('../aws/imageDispatcher');

const getProductImage = async(productId) => {
    const s3Res = await imageDispatcher('GET', { imageKey: productId });
    if (s3Res.err) {
        return null;
    } else {
        return s3Res.imageURI;
    }
}

const getProducts = async(products) => (
    Promise.all(products.map(async(product) => {
        const imageURI = await getProductImage(product._id);
        return ({
            id: product._id,
            isbn: product._source.isbn,
            isbn13: product._source.isbn13,
            title: product._source.title,
            authors: product._source.authors,
            seller: product._source.seller,
            price: product._source.price,
            condition: product._source.condition,
            imageURI
        })
    }))
)

const getProductFilter = (products) => (
    products.map((product) => ({
        id: product._id,
        sortScore: product._score
    }))
)

module.exports = (app) => {
    app.post('/inventory-isbn', async(req, res) => {
        const elasticRes = await axios.post('http://3.83.55.90:9200/_search/?filter_path=hits', {
            "query": {
                "bool": {
                    "should": [
                        { "match": { "isbn": req.body.isbn } },
                        { "match": { "isbn13": req.body.isbn } }
                    ],
                    "minimum_should_match": 1
                }
            }
        }).catch((err) => {
            res.json(null);
        });

        const productFilter = getProductFilter(elasticRes.data.hits.hits);
        res.json(productFilter);
    });

    app.post('/inventory-author', async(req, res) => {
        const elasticRes = await axios.post('http://3.83.55.90:9200/_search/?filter_path=hits', {
            "query": {
                "match": {
                    "authors": req.body.author
                }
            }
        }).catch((err) => {
            res.json(null);
        });

        const productFilter = getProductFilter(elasticRes.data.hits.hits);
        res.json(productFilter);
    });

    app.post('/inventory-title', async(req, res) => {
        const elasticRes = await axios.post('http://3.83.55.90:9200/_search/?filter_path=hits', {
            "query": {
                "match": {
                    "title": req.body.title
                }
            }
        }).catch((err) => {
            res.json(null);
        });

        const productFilter = getProductFilter(elasticRes.data.hits.hits);
        res.json(productFilter);
    });

    app.get('/inventory', async(req, res) => {
        const elasticRes = await axios.post('http://3.83.55.90:9200/_search/?filter_path=hits', {
            "query": {
                "bool": {
                    "filter": {
                        "term": { "isForSale": "true" }
                    }
                }
            }
        }).catch((err) => {
            res.json(null);
        });

        const products = await getProducts(elasticRes.data.hits.hits);
        res.json(products);
    });

    app.get('/inventory-all', async(req, res) => {
        const elasticRes = await axios.post('http://3.83.55.90:9200/_search/?filter_path=hits')
        .catch((err) => {
            res.json(null);
        });

        const products = await getProducts(elasticRes.data.hits.hits);
        res.json(products);
    });
}