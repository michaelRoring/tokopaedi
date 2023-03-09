const {User, Item, Transaction, TransactionItem, ItemDetail} = require('../models');

class Controller {

    // show form register
    static register (req, res) {
        res.render('register-form');
    }

    // show 
    static postRegister(req, res) {
        const {email, password, role} = req.body;
        console.log(email, password, role);
    }
}

module.exports = Controller;