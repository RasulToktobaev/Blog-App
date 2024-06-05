import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { registerValidator } from './validations/auth.js';


import UserModel from './models/User.js';
import checkAuth  from './utils/checkAuth.js';

mongoose.connect("mongodb+srv://toktobaevrasul2002:wwwwww@cluster0.uppwel6.mongodb.net/blog",

).then(() => console.log('Connected to database'))
    .catch((err) => console.log("Db error", err));

const app = express();

app.use(express.json());



app.post('/auth/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if(!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPass) {
            return res.status(400).json({ message: 'Неверный логин или пароль' });
        }

        const token = jwt.sign({
            _id: user._id,
        },
            'secret123',
            {
                expiresIn: "30days",
            }
        );
        const { passwordHash,...userData } = user._doc;

        res.json({
           ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
})


app.post('/auth/register', registerValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        },
            'secret123',
            {
                expiresIn: "30days",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка при регистраций",
        });
    }
});


app.get("/auth/me", (req, res) => {

})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server is running on port 3000');
});