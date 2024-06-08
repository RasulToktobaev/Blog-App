import express from "express";
import mongoose from "mongoose";
import { registerValidator } from './validations/auth.js';
import checkAuth  from './utils/checkAuth.js';
import * as userController from './controllers/userController';


mongoose.connect("mongodb+srv://toktobaevrasul2002:wwwwww@cluster0.uppwel6.mongodb.net/blog",

).then(() => console.log('Connected to database'))
    .catch((err) => console.log("Db error", err));

const app = express();

app.use(express.json());



app.post('/auth/login', UserController.login); 
app.post('/auth/register', registerValidator, userController.register);
app.get("/auth/me", checkAuth, userController.getMe)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server is running on port 3000');
});