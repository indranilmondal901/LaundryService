//collection
const customer = require('../model/userSchema')
//bcrypt
const bcrypt = require('bcrypt');

exports.registerController = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await customer.findOne({ email: email });
        if (user) {
            res.status(400).send({
                message: "Email already exist"
            })
        } else {
            // const fullAddress = `${req.body.address},${req.body.state},${req.body.district},pin-${req.body.pincode}`
            const userData = new customer({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                address:[{
                    add: `${req.body.address},${req.body.district},${req.body.state},pin-${req.body.pincode}`
                }]
            })
            //hashing before save
            //save into db
            await userData.save();
            res.status(200).send({
                status: "sucessfully registered",
                data: userData
            })
        }
    } catch (error) {
        res.status(401).send({
            message: error.message
        })
    }
}

exports.loginController = async (req, res) => {
    try {
        const enteredUsername = req.body.username;
        const enteredPassword = req.body.password;

        const loginUserData = await customer.findOne({ email: enteredUsername });

        if (!loginUserData) {
            res.status(500).send({
                status: 500,
                message: "User with the given email not found"
            })
            return;
        }

        const checkPassword = await bcrypt.compare(enteredPassword, loginUserData.password);
        if (checkPassword) {
            const token = await loginUserData.generateAuthToken(loginUserData);
            // console.log(` logintoken from rout.js==> ${token}`)
            res.status(200).send({
                status: "login successfully",
                token: token,
                user: loginUserData
            })
        } else {
            res.status(401).send({
                status: 401,
                message: "Invalid credential"
            })
        }
    } catch (err) {
        res.status(500).send({
            status: 500,
            message: err.message
        })
    }
}

exports.logoutController = async (req, res) => {
    try {
        // console.log(`this user is logged out ==> ${req.user.name}`)
        //logout from all devices
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send({
            msg: "logout Sucessfully"
        })
    } catch (err) {
        res.status(501).send({
            msg: "err in logout",
            err: err.message
        })
    }
}
