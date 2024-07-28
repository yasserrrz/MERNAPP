import { Schema, model , Types } from "mongoose";


const commentsSchema  = new Schema({
    text:{
        type: String , 
        required : true,

    },
    user: {
        type: Types.ObjectId,
        ref: "User", 
        required: true
    },
    post: {
        type: Types.ObjectId,
        ref: "Post", 
        required: true
    }
})

export const commentModel = model('Comment' , commentsSchema)