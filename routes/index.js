const express= require ('express')
const Router = express.Router()

const userRouter = require('./user_router')
const adminRouter = require('./admin_router')
const loginController = require('../controllers/controller_login')

Router.use('/users', userRouter)
// Router.use('/admin', adminRouter)
Router.use('/admin',(req,res) => {
    console.log(req.session)
    const sess = req.session;
    if(sess.user.username) {
        adminRouter
        // res.write(`<h1>Hello ${sess.username} </h1><br>`);
        // res.end('<a href='+'/logout'+'>Logout</a>');
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
});
Router.post('/loginadmin', loginController.loginAdmin)
Router.use('/', (req, res) => res.render('home'))

module.exports = Router