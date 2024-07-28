import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    picture: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
        default: "male"
    },
    friends: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    confirmed: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    age: {
        type: Number,
        min: [10, "too small age"],
        max: [80, 'too large age']
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impression: Number

}, { timestamps: true });

userSchema.post("init", function(doc){
    if(doc.picture){
        doc.picture = process.env.IMAGE_BASE_URL + doc.picture
    }
})

export const userModel = model('User', userSchema);
