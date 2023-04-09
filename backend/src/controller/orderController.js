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
    const id = Math.floor(Math.random() * 9000000) + 1000000;
    
    try {
        await Orders.updateOne(
            { user_id: _id },
            {
              $push: {
                orders: {
                  order: order,
                  total_price: total_price,
                  _id:"OD".concat(id)
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

exports.getAllOrdersController=async(req,res)=>{
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

exports.cancelOrderController=async(req,res)=>{
    const {id}=req.params;
    const {_id:user_id} =req.user;
    try {
        const updateOrder=await Orders.findOneAndUpdate({user_id,"orders._id":id},{$set:{'orders.$.orderStatus':'Cancelled'}},{new:true});
        if(!updateOrder){
            return res.status(404).send({
                message:"OrderId does not matched"
            })
        }
        res.status(200).send({
            message:"Order cancelled successfully"
        })
    }catch(error) {
        res.status(200).send({
            message:error.message
        })
    }
}