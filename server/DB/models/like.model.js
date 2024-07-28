import { Schema, Types, model } from "mongoose";

const likeSchema = new Schema({
    user: [{
        type: Types.ObjectId,
        ref: "User", 
        required: true
    }],
    post: {
        type: Types.ObjectId,
        ref: "Post", 
        required: true
    }
}, { timestamps: true });

export const likeModel = model('Like', likeSchema);