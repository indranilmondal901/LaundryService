const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//hashing
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next()
})

//Token Generation
userSchema.methods.generateAuthToken = async (loginUser) => {
    console.log(loginUser);
    try {
        const token = jwt.sign({ _id: loginUser._id}, process.env.SECRET_KEY);
        console.log(token);
        loginUser.tokens = await loginUser.tokens.concat({ token: token })
        await loginUser.save();
        return token;
    } catch (error) {
        console.log("err in generating token==>" + error);
        res.status(500).send(err);
    }
}

//model
const customer = mongoose.model('customer', userSchema);
module.exports = customer;