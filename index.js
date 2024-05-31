import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(' Hello, world')
});

app.post('/auth/login', (req, res) => {
    console.log(req.body)

    if (req.body.email === "test@test.ru") {
        const token = jwt.sign(
            {
            email: req.body.email,
            fullName: 'Валера Тимкин',
        },
            "secret123",
        );
    }

    res.json({
        success: true,
        token,
    })
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server is running on port 3000');
});