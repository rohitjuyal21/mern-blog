const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const Post = require('./models/Post');
const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads')); // for static uploads file

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
                id: userDoc._id,
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
    const { token } = req.cookies;
    jwt.verify(token, "weffwdkuhehfwkfhwfbuwf", {}, (err, info) => {
        if (err) throw err;
        res.json(info);
        console.log(info)

    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    // npm i multer ---> handles form data, used for uploading files
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, "weffwdkuhehfwkfhwfbuwf", {}, async (err, info) => {
        if (err) throw err;
        
        const { title, description, content } = req.body;
        const postDoc = await Post.create({
            title,
            description,
            content,
            cover: newPath,
            author:info.id
        });
    
        res.json(postDoc);
    })

});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    // res.json({test: 4})
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, "weffwdkuhehfwkfhwfbuwf", {}, async (err, info) => {
        if (err) throw err;
        
        const { id, title, description, content } = req.body;
        const postDoc = await Post.findbyId(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        
        if(!isAuthor) {
            return res.status(400).json('You are not the author'); 
        }
        await postDoc.update({
            title,
            description,
            content,
            cover: newPath ? newPath : postDoc.cover,
        })
        
    })
})

app.get('/post', async (req, res) => {
    const posts = await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    .limit(20);
    res.json(posts)
})

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    postDoc = await Post.findById(id).populate('author', ['username']);
    console.log(postDoc)
    res.json(postDoc)
})

app.listen(4000, () => {
    console.log("Server is working properly")
})

