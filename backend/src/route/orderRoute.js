const express=require('express');

const {startOrderController,createOrderController,getAllOrders} = require('../controller/orderController')
const auth=require('../middlewire/auth')

const router=express.Router();

router.post('/create',auth,startOrderController);
router.patch('/create',auth,createOrderController);
router.get('/getAllOrders',auth,getAllOrders)

module.exports=router;
