import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { registerValidator } from './validations/auth.js';


import UserModel from './models/User.js';

mongoose.connect("mongodb+srv://toktobaevrasul2002:wwwwww@cluster0.uppwel6.mongodb.net/blog",

).then(() => console.log('Connected to database'))
    .catch((err) => console.log("Db error", err));

const app = express();

app.use(express.json());



app.post('/auth/register', registerValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            avatarUrl: req.body.avatarUrl,
            passwordHash,
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id:user._id,
        }, 
        'secret123',
        {
            expiresIn: "30days",
        }
    );

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка при регистраций",
        });
    }
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server is running on port 3000');
});