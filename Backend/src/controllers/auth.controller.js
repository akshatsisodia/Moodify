const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");

const userRegisterController = async (req, res)=>{

    const {username, email, password} = req.body;

    const isUserExist = await userModel.findOne({
        $or:[
            {
                username
            },
            {
                email
            }
        ]
    }).select("-password")

    if(isUserExist){
        return res.status(409).json({
            message:"Registeration Failed",
        })
    }

    const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,email,password:hash
    })

    const token = jwt.sign({
        userId:user._id,
        username:user.username
    }, process.env.JWT_SECRET,{expiresIn:"3d"});

    res.cookie("token",token);
    
    res.status(200).json({
        message:"User Registered Successfully.",
        user
    })

}

const userLoginController = async (req, res) =>{
    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("+password");

    if(!user){
        return res.status(401).json({
            message:"Invalid Credentials."
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect){
        return res.status(401).json({
            message:"Invalid Credentials."
        })
    }

    const token = jwt.sign({
        userId:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token);

    res.status(200).json({
        message:"User LoggedIn Successfully."
    })
}

const userLogoutController = async (req, res) =>{
    const token = req.cookies.token;

    res.clearCookie("token");

    await redis.set(token,Date.now().toString());

    res.status(200).json({
        message:"User Logged Out Successfully."
    })
    
}

const getMeUserController = async (req, res) =>{
    const userId = req.user.userId;

    const user = await userModel.findById(userId);

    res.status(200).json({
        message:"User Fetched Successfully.",
        user
    })
}

module.exports = {
    userRegisterController,
    userLoginController,
    userLogoutController,
    getMeUserController
}