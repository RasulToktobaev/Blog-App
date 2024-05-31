import express from "express";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(' Hello, world')
});

app.post('/auth/login', (req, res) => {
    console.log(req.body)
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