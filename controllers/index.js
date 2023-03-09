const {User, Item, Transaction, TransactionItem, ItemDetail} = require('../models');
const bcrypt = require ('bcryptjs');
const {Op} = require ('sequelize');
const session = require('express-session')

class Controller {

    // show form register
    static register (req, res) {
        res.render('register-form');
    }

    // show 
    static postRegister(req, res) {
        const {email, password, role} = req.body;

        
        User.create({email, password, role})
            .then(result => {
                // res.send(`success menambahkan ${email}`)
                res.redirect('/login');
            })
            .catch(err => res.send(err.errors[0].message));
    }

    // login
    static login(req, res) {
        const {error} = req.query;

        res.render('login-form', {error});
    }

    // POST login page
    static postLogin(req, res) {
        const {email, password} = req.body;


        User.findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            
            if(user) {
                const isValid = bcrypt.compareSync(password, user.password);
                if (isValid) {
        
                    //set session
                    req.session.email = user.email;
                    return res.redirect('/tokopaedi');
                } else {
                    const error = 'Password invalid';
                    return res.redirect(`/login?error=${error}`)
                }
            }
        
        })
        .catch(err => res.send(err));
    }

    // home
    static tokopaedi(req, res) {
        Item.findAll()
            .then(items => {
                res.render('homepage', {items});
            })
            .catch(err => res.send(err));
    }


    // change profile
    static changeProfile(req, res) {
        console.log(req.session.email);
    }
}

module.exports = Controller;