import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidator } from './validations/auth.js';
import UserModel from './models/User.js';

mongoose.connect("mongodb+srv://toktobaevrasul2002:wwwwww@cluster0.uppwel6.mongodb.net/",

).then(() => console.log('Connected to database'))
    .catch((err) => console.log("Db error", err));

const app = express();

app.use(express.json());



app.post('/auth/register', registerValidator, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const doc = new UserModel({
        fullName: req.body.fullName,
        email: req.body.email,
        passwordHash: req.body.password,
        avatarUrl: req.body.avatarUrl,
    });

    res.json({
        success: true,
    })
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server is running on port 3000');
});