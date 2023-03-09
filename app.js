const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers');

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

// register
app.get('/register', Controller.register);
app.post('/register', Controller.postRegister);

// login
app.get('/login', Controller.login);
app.post('/login', Controller.postLogin);


// homepage
// app.get('/tokopaedi', Controller.tokopaedi);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})