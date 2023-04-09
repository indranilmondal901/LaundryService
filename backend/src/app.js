const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 8080;

//requiring connection
require('./db/connection')

//routing require
const userRouter=require("./route/userRoute");
const orderRouter=require("./route/orderRoute")

//middlewire
app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use('/order',orderRouter)

//listin
app.listen(PORT,()=>{console.log(`server is starting on port no ${PORT}`)})