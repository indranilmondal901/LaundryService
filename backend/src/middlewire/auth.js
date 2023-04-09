const customer = require('../model/userSchema');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = async(req,res,next)=>{
    try {
        const token = req.headers.token;
        // console.log(token);
        const verifyUser = jwt.verify(token,process.env.SECRET_KEY)
        // console.log(verifyUser)
        if(verifyUser){
            const user = await customer.findOne({_id: verifyUser._id});
            req.token = token;
            req.user = user;
        }
        next();
    } catch (error) {
        return res.status(500).send({
            message:error.message
        })
    }
}
module.exports = auth;