const {User, Item, Transaction, TransactionItem, ItemDetail} = require('../models');
const bcrypt = require ('bcryptjs');
const {Op} = require ('sequelize');

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
        .then(result => {
            if (result) {
                if(result) {
                    const isValid = bcrypt.compareSync(password, result.password);
                    if (isValid) {
                        return res.send("sukses");
                    } else {
                        const error = 'Password invalid';
                        return res.redirect(`/login?error=${error}`)
                    }
                }
            } else {
                res.redirect('/login');
            }
        })
        .catch(err => res.send(err));
    }

}

module.exports = Controller;