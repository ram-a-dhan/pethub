const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const bodyParser = require('body-parser')
const Router  = require('./routes')

app.set('view engine','ejs')

app.use(session({
    secret: 'qwertyuiop',
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(__dirname + '/views'));

app.use('/', Router)

app.listen(port,()=>{
    console.log('now listening to : ',port)
})



// const userRouter = require('./routes/user_router')
// app.use('/users',userRouter)


// const adminRouter = require ('./routes/admin_router')
// // app.use('/admin', adminRouter)
// app.use('/admin',(req,res) => {
//     sess = req.session;
//     if(sess.email) {
//         res.write(`<h1>Hello ${sess.email} </h1><br>`);
//         res.end('<a href='+'/logout'+'>Logout</a>');
//     }
//     else {
//         res.write('<h1>Please login first.</h1>');
//         res.end('<a href='+'/'+'>Login</a>');
//     }
// });

