import express from "express";
import mongoose from "mongoose";
import { registerValidator, loginValidator, postCreateValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as userController from './controllers/userController.js';
import * as postController from './controllers/postController.js';


mongoose.connect("mongodb+srv://toktobaevrasul2002:wwwwww@cluster0.uppwel6.mongodb.net/blog",

).then(() => console.log('Connected to database'))
    .catch((err) => console.log("Db error", err));

const app = express();

app.use(express.json());



app.post('/auth/login', loginValidator, userController.login);
app.post('/auth/register', registerValidator, userController.register);
app.get("/auth/me", checkAuth, userController.getMe);


app.get("/posts",  postController.getAll);
app.get("/posts/:id", postController.getOne);
app.post("/posts", checkAuth, postCreateValidation, postController.create);
app.delete("/posts/:id", checkAuth, postController.remove);
app.patch("/posts/:id",  postController.update);


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server is running on port 3000');
});