import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import {registerValidator} from './validations/auth.js'

mongoose.connect("mongodb+srv://toktobaevrasul2002:wwwwww@cluster0.uppwel6.mongodb.net/",

).then(() => console.log('Connected to database'))
   .catch((err) => console.log("Db error", err));

const app = express();

app.use(express.json());



app.post('/auth/register', registerValidator,(req, res) => {
   
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server is running on port 3000');
});