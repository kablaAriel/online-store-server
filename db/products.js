const Product = require('../models/product');
const data = require('../data');

const getProducts = () =>{
        return Product.find();
        // return data.products;
}

const getProductById = id =>{
        return Product.findById(id);
}

const removeProductById = id =>{
    return Product.deleteOne({_id: id});
}

const updateProductById = (id,product) =>{
    return Product.updateOne({_id: id}, { $set: {...product}});
}

const saveProduct = product => {
    const newProduct = new Product({
        name: product.name,
        description: product.description,
        price: product.price
    });
        return newProduct.save();
};

module.exports = {
    getProducts,
    saveProduct,
    updateProductById,
    removeProductById,
    getProductById
}