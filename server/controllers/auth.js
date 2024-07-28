

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { userModel } from '../DB/models/user.model.js';
import dotenv from "dotenv";
import path from "path";

dotenv.config();
export const register = async(req, res) => {
    try {
        const { firstName, lastName, gender, age, location, occupation,  impression, email, password, viewedProfile } = req.body;
        let picture ='';
        if (req.file) {
            picture = req.file.filename; // Assign the filename to picture if a file was uploaded
        }
        // Generate a salt
        const salt = bcrypt.genSaltSync(8); // You can specify the number of rounds here
        
        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        // Create a new user with the hashed password
        const newUser = new userModel({ firstName, lastName, gender, email, password: hashedPassword, location, occupation, picture , impression: Math.floor(Math.random() * 1000), viewedProfile: Math.floor(Math.random() * 1000), age });
        
        // Save the user to the database
        const savedUser = await newUser.save();
        
        // Respond with the saved user
        res.status(201).json(savedUser);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};


export const login = async(req, res) => {
    try {
        const {  email, password,} = req.body;
       
       const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "user not exist or password is not correct" });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        console.log('validPassword' , validPassword)
        if (!validPassword) {
            return res.status(404).json({ message: "user not exist or password is not correct"});
        }
        await user.populate({   // populate return promise  that resolves to the document after population.
            path:'friends',
            select:'firstName lastName picture location occupation'
        });
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);  //  { expiresIn: 3600 } // expires
         delete user.password;
        //  user.picture = process.env.IMAGE_BASE_URL +user.picture
        //  console.log( process.env.IMAGE_BASE_URL)
        res.status(200).json({ token , user });
    
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};