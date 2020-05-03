const express = require('express');
const router = express.Router();
const {
    getProducts,
    saveProduct,
    updateProductById,
    removeProductById,
    getProductById
} = require('../db/products');

router.get('/:productId', async (req, res) => {
    try{
    const product = await getProductById(req.params.productId);
    return res.json(product);
    }
    catch(e){
        req.json({ message: e })
    }
});

router.get('/', async (req, res) => {
    console.log('get products!!!')
    try{
    const products = await getProducts();
    return res.json(products);
    }
    catch(e){
        req.json({ message: e })
    }
});

router.post('/', async (req, res) => {
    try{
        const resData = await saveProduct(req.body);
        res.json(resData);
    }
    catch(e){
        req.json({ message: e })
    }
});

router.delete('/:productId', async (req, res) => {
    try{
    const product = await removeProductById(req.params.productId);
    return res.json(product);
    }
    catch(e){
        req.json({ message: e })
    }
});

router.patch('/:productId', async (req, res) => {
    try{
        const product = req.body;
        const updatedProduct = await updateProductById(req.params.productId, product);
    return res.json(updatedProduct);
    }
    catch(e){
        req.json({ message: e })
    }
});

module.exports = router;