import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('111 Hello, world')
});

app.listen(4444, (err) => {
    if (err) {
       return console.log(err);
    }
    console.log('Server is running on port 3000');
});