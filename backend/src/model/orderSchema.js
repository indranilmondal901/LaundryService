const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    orders: {
        type: [{
            order: {
                type: [{
                    product_type: {
                        type: String,
                        required: true
                    },
                    quantity: {
                        type: Number,
                        required: true
                    },
                    wash_type: {
                        type: [String],
                        required: true
                    },
                    price: {
                        type: Number,
                        required: true
                    }
                }],
                required: true
            },
            total_price: {
                type: Number,
                required: true
            },
            orderedAt: {
                type: Date,
                default: Date.now()
            },
            orderStatus:{
                type:String,
                default:"Ready to pickup"
            },
            _id:{
                type:String,
                required:true
            }
        }],
        required: true
    }
});

const orderModel = mongoose.model('Orders', orderSchema);

module.exports = orderModel;
