const { Admin } = require('../models')

class Controller {
    static loginAdmin(req, res) {
        let adminData = { 
            username: req.body.username,
            password: req.body.password
         }
        Admin.findOne({ where: adminData })
        .then(data => {
            req.session.user = {
                username: data.username
            }
            res.redirect('/admin')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller