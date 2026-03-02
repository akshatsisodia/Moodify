const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
    token:{
        type:String
    }
},{timestamps:true});

blacklistSchema.index({token:1});

const blacklistModel = mongoose.model("BlacklistedToken",blacklistSchema);

module.exports = blacklistModel;