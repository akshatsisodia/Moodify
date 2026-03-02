const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

const identifyUser = async (req, res, next) =>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            error:"Unautharized",
            message:"Authentication token is missing."
        })
    }

    const isTokenBlacklisted = await blacklistModel.findOne({token})

    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Session invalid. Please log in again."
        })
    }

    let decode;

    try{
        decode = jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return res.status(403).json({
            error:"Invalid_Token",
            error_description:"The provided token is invalid or expired."
        })
    }

    req.user = decode;

    next();
}

module.exports = identifyUser;