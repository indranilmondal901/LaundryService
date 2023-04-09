const mongoose=require('mongoose');

const orderScheam=mongoose.Schema({
    user_id:{type:String,require:true},
    user_name:{type:String,require:true},
    orders:{type:[Object]}
    // orders:[
    //     {
    //         order:[
    //             {
    //                 product_type:{type:String,require:true},
    //                 quantity:{type:Number,require:true},
    //                 wash_type:[String],
    //                 price:{type:Number,require:true},
    //             }
    //         ],
    //         total_price:{type:Number,require:true},
    //         oderedAt:{type:Date,default:Date.now()}
    //     }
    // ]

})

const orderModel=mongoose.model('Orders',orderScheam);

module.exports=orderModel;