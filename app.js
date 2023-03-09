const express = require('express')
const app = express()
const Controller = require('./controllers');
const session = require('express-session')

const port = 3000

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'tokopaedi toko paling sukses',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }))


// register
app.get('/register', Controller.register);
app.post('/register', Controller.postRegister);

// login
app.get('/login', Controller.login);
app.post('/login', Controller.postLogin);

// session
app.set('trust proxy', 1) // trust first proxy


// homepage
app.get('/tokopaedi', Controller.tokopaedi);


// middleware
app.use((req, res, next) => {
    if(!req.session.email) {
        const error = 'Please login first';
        res.redirect(`/login?error=${error}`);
    } else {
        next();
    }
  })

// change profile
app.get('/profile', Controller.changeProfile);
// app.post('/profile', Controller.changeProfile);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})