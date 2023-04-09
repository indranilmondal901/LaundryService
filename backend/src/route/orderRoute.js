const express=require('express');

const {startOrderController,createOrderController,getAllOrders} = require('../controller/orderController')

const router=express.Router();

router.post('/create',startOrderController);
router.patch('/create',createOrderController);
router.get('/getAllOrders',getAllOrders)

module.exports=router;
