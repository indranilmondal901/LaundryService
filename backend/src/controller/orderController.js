const mongoose=require('mongoose');

const Orders=require('../model/orderSchema')
const Users=require('../model/userSchema')

exports.startOrderController=async(req,res)=>{
    try {
        const existUser=await Orders.find({user_id:req.user_id})
        if(existUser){
            return res.status(400).send({
                message:"User is already register for create a order"
            })
        }
        const user=await Users.findById({_id:req.user_id});
        await Orders.create({user_name:user.name,user_id:req.user_id})
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
    const user_id=req.user_id;
    const {orders} =req.body;
    try {
        await Orders.findOneAndUpdate(user_id,{$addToSet:{'orders':[{orders,orderedAt:Date.now}]}})
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
    const user_id=req.user_id;
    try {
        const orders=await Orders.find({user_id});
        res.status(200).send(orders.orders)
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
    }

}