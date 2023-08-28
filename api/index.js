const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors({
    credentials: true, 
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser())

mongoose.connect('mongodb+srv://rohitjuyal2003:D0NmELs4eaVz1O9T@cluster0.bdgow9j.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const userDoc = await User.create({ username, password: hashedPassword });
        res.json({
            userDoc,
            success: true,
        });
    } catch (e) {
        res.status(400).json(e)
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        const passOk = await bcrypt.compare(password, userDoc.password);
        if (passOk) {
            // logged in
            const token = jwt.sign({ username, id: userDoc._id }, "weffwdkuhehfwkfhwfbuwf")
            console.log(token);
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
            
        } else {
            res.status(400).json('Wrong credentials!')
            console.log("error")
        }
    } catch (e) {
        res.status(400).json(e)
        console.log(e)
    }

})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, "weffwdkuhehfwkfhwfbuwf", {}, (err, info) => {
        if (err) throw err;
        res.json(info);
        console.log(info)

    })
})

app.post('/logout', (req, res) =>{
    res.cookie('token', '').json('ok')
})

app.listen(4000, () => {
    console.log("Server is working properly")
})

