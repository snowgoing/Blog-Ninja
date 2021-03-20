const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const app = express();
const port = 3001;


// connect to MongoDB
const dbURI = 'mongodb+srv://snowgoing:test1234@cluster0.rqjvn.mongodb.net/ninja-blog?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(results => app.listen(port))
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Blogs', blogs: result})
        })
        .catch(err => {
            console.log(err);
        })
});

app.post('/blogs', (req, res) => {
    // urlencoded middleware gives you the req.body property
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create New Blog' });
})

app.get('/about-me', (req,res) => {
    res.redirect('/about')
});

app.use((req,res) => {
    res.status(404).render('404', { title: '404' });
});




