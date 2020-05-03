const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
    },
    code: {
        type: Number,
    },
    img: {
        type:String,
        default: 'https://gcstatic.mysupermarket.co.il/main_8.27.46/img/list/he-il/imageunavailable.png'
    }
});

module.exports = mongoose.model('Products', ProductSchema);