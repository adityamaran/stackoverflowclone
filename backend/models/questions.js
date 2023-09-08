import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    tittle:String,
    body:String,
    tags:[],
    created_at:{
        type:Date,
        default:Date.now(),},
        user:Object,
        comment_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment",
        },
    

});
