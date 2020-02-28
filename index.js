var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const port = process.env.PORT || 5432
var app = express();
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.set('view engine','ejs')

app.use(express.urlencoded({extended: false}));


// app.get('/login', function (req, res) {
//     if (!req.query.username || !req.query.password) {
//         res.send('login failed');
//     } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
//         req.session.user = "amy";
//         req.session.admin = true;
//         res.redirect('/content');
//     }
// });

const cont_Admin = require('./controllers/controller_admin')

app.get('/adminLogin',cont_Admin.loginForm)
app.post('/adminLogin',cont_Admin.loginAdmin)

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect("/");
});


var auth = function(req, res, next) {
    console.log(req.session.user);
    if (req.session.user && req.session.user.levelUser==='Admin'){
        return next();

    }
    else{
        console.log(req.session.user)
        return res.send('user ga berhak')

    }
};

//======================  ADMIN ONLY =====================================================

const Controller = require('./controllers/controller_admin')
app.get('/admin',auth,Controller.showPet)
app.get('/admin/add',auth,Controller.addPetForm)
app.post('/admin/add',auth,Controller.addPet)
app.get('/admin/edit/:id',auth,Controller.editForm)
app.post('/admin/edit/:id',auth,Controller.editPet)
app.get('/admin/delete/:id',auth,Controller.deletePet)

//======================================   user ========================================




//=========================== USER =======================================================

var authuser = function(req, res, next) {
    console.log(req.session.user);
    if (req.session.user && req.session.user.levelUser==='User'){
        return next();

    }
    else{
        console.log(req.session.user)
        return res.send('user ga berhak')

    }
};


const Adopter = require('./controllers/controller_user')
app.get('/', (req,res)=>{
    res.render('userHome.ejs')
})
app.post('/',Adopter.login)
app.get('/user/register',Adopter.registerForm)
app.post('/user/register',Adopter.register)


//=======need authuser ========================
app.get('/user/quizpage',authuser,Adopter.quizForm)
app.post('/user/quizpage',authuser,Adopter.quizHitung)

app.get('/users/',authuser,Adopter.showPet)
app.get('/users/petlist/:id',authuser,Adopter.detail)

app.get('/users/pickpet/:id',authuser,Adopter.pick)

app.get('/users/recomended',authuser,Adopter.selectedPick)
app.get('/users/userpicked',authuser,Adopter.selectUserPicked)

app.get('/user/test',authuser,Adopter.showUnselected)







app.listen(port,()=>{
    console.log('now listening to : ',port)
})
