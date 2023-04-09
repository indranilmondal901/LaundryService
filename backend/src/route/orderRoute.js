const express=require('express');

const {startOrderController,createOrderController,getAllOrdersController,cancelOrderController} = require('../controller/orderController')
const auth=require('../middlewire/auth')

const router=express.Router();

router.post('/create',auth,startOrderController);

router.patch('/create',auth,createOrderController);
router.patch('/cancel/:id',auth,cancelOrderController)

router.get('/getAllOrders',auth,getAllOrdersController)

module.exports=router;
