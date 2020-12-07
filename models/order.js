const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const productCartSchema = new mongoose.Schema({

    product:{
        type:ObjectId,
        ref:"Product"
    },
    price:{type:Number},
    name:{type:String},
    count:{type:Number}

})

const ProductCart = mongoose.model('ProductCart',productCartSchema);
const orderSchema= new mongoose.Schema({

    products :[productCartSchema],
    user:{
        type:ObjectId,
        ref:"User"
    },
    address:{type:String},
    transactionid:{},
    amount:{type:Number},
    updated:Date

},{timestamps:true});

const Order = mongoose.model('Order',orderSchema);

module.exports = {ProductCart,Order};
