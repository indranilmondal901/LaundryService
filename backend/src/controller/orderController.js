const mongoose=require('mongoose');

const Orders=require('../model/orderSchema')

exports.startOrderController=async(req,res)=>{
    const {_id,name} =req.user;
    try {
        const existUser=await Orders.findOne({user_id:_id})
        if(existUser){
            return res.status(400).send({
                message:"User is already register for create a order"
            })
        }
        await Orders.create({user_name:name,user_id:_id})
        res.status(200).send({
            message:"Now user can create a order"
        })
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
    }
}

exports.createOrderController=async(req,res)=>{
    const {_id}=req.user;
    const {order,total_price}=req.body;
    try {
        await Orders.updateOne(
            { user_id: _id },
            {
              $push: {
                orders: {
                  order: order,
                  total_price: total_price
                }
              }
            },
            { upsert: true, runValidators: true }
          );
        res.status(200).send({
            message:"Order created successfully"
        })
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
    }
}

exports.getAllOrders=async(req,res)=>{
    const {_id}=req.user;
    try {
        const orders=await Orders.find({user_id:_id});
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
    }

}