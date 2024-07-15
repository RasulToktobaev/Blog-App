import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { registerValidator, loginValidator, postCreateValidation } from './validations.js';
import {handleValidationErrors, checkAuth} from "./utils/index.js"
import {postController, userController} from './controllers/index.js';
import cors from 'cors'


mongoose.connect("mongodb+srv://toktobaevrasul2002:wwwwww@cluster0.uppwel6.mongodb.net/blog")
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log("Db error", err));



const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads/');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());

app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidator, handleValidationErrors, userController.login);
app.post('/auth/register', registerValidator, handleValidationErrors, userController.register);
app.get("/auth/me", checkAuth, userController.getMe);

app.post("/upload", checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get("/posts", postController.getAll);
app.get("/posts/:id", postController.getOne);
app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, postController.create);
app.delete("/posts/:id", checkAuth, postController.remove);
app.patch("/posts/:id", checkAuth, postCreateValidation, postController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server is running on port 4444');
});

