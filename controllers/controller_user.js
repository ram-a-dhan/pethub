const { Admin, Pet, Adopter, AdopterPet } = require('../models')
const { emptyFields } = require('../helpers/emptyFields')
const { Op } = require("sequelize");
class Controller{

    static registerForm(request,response){
        response.render('registerForm.ejs')
    }

    static register(request,response){
        let obj={
            username:request.body.username,
            password:request.body.password,
            email: request.body.email,
            name:request.body.name,
            address:request.body.address,
        }
        Adopter.create(obj)
        .then(res=>{
            response.redirect('/')
        })
        .catch(res=>{
            response.send(res.message)
        })
    }

    //=================== Login ========================


    static login(req, res) {
        console.log('ini login admin')
        if (emptyFields([req.body.username,req.body.password])) {
            throw new Error('isi dong semuanya!')
        }
        let userdata = { 
            username: req.body.username,
            password: req.body.password
        }
        console.log(userdata)
        Adopter.findOne({ where: userdata })
        .then(data => {
            if(data){
                req.session.user = {
                    username:data.username,
                    levelUser:data.levelUser,
                    userId:data.id,
                    hasTakenQuiz:data.hasTakenQuiz
                }
                

            }
            if (data.hasTakenQuiz!==true){
                res.render('quizpage.ejs')
            }else{
                
                res.redirect('/users')
            }
        })
        .catch(err => {
            console.log('gak masuk')
            res.send(err.message)
        })
    }

    //===============================================show pet===================================================
    
    static showPet(request,response){
        let dataPet =null
        let id =request.session.user.userId
        Pet.findAll()
        .then(data=>{
            dataPet=data
            return Adopter.findByPk(id)
        })
        .then(res=>{
            response.render('petListUser.ejs',{data:dataPet,res})
        })

        .catch(err=>{
            response.send(err)
        })
    }
    static detail(request,response){
        let id = request.params.id
        Pet.findByPk(id)
        .then(data=>{
            response.render('detailPet.ejs',{data})
        })
    }

    

    //===========================         QUIZ Assesment ========================================

    static quizForm(request,response){
        response.render('quizpage.ejs')
    }

    static quizHitung (request,response){
        let countIndependent = Number(request.body.independentA) + Number(request.body.independentB) + Number(request.body.independentC) 
        let countSpacious = Number(request.body.spaciousA) + Number(request.body.spaciousB )+ Number(request.body.spaciousC)
        let countFriendly = Number (request.body.friendlyA) + Number(request.body.friendlyB) + Number(request.body.friendlyC)

        
        let userIndependent = null
        let userSpacious = null
        let userFriendly = null

        if (countIndependent>=2){
            userIndependent=false
        }else{
            userIndependent=true
        }

        if (countSpacious>=2){
            userSpacious=false
        }else{
            userSpacious=true
        }

        if (countFriendly>=2){
            userFriendly=true
        }else{
            userFriendly=false
        }

        let obj={
            userid:request.session.user.userId,
            username:request.session.user.username,
            independent:userIndependent,
            spacious:userSpacious,
            friendly:userFriendly
        }

        Adopter.update({
            hasTakenQuiz:true,
            isIndependent:userIndependent,
            isSpacious:userSpacious,
            isFriendly:userFriendly
        },{where:{id:request.session.user.userId}})
        .then(res=>{
            response.redirect('/users')
        })
        .catch(res=>{
            response.send(err)
        })

        response.send(obj)
    }

//====================================          PILIH           ==================================       
    static pick(request,response){
        AdopterPet.create(
            {
                AdopterId:request.session.user.userId,
                PetId: request.params.id
            }
        )
        .then(res=>{
            response.redirect('/users')
        })
        .catch(res=>{
            response.send(res)
        })
    }

    static selectedPick(request,response){
        let userid = request.session.user.userId
        let preferPet=null
        Adopter.findByPk(userid)
        .then(data=>{
            preferPet=data
            return Pet.findAll({
                where:{
                    isIndependent:data.isIndependent,
                    isSpacious:data.isSpacious,
                    isFriendly:data.isFriendly
                }
            })
        })
        .then(data=>{
            response.render( 'user_recommended' ,{data})
        })
    }

    static selectUserPicked(request,response){
        
        let userId= request.session.user.userId

        Adopter.findOne({ where:{id:userId} , include:[{model:Pet}] })
        .then(data=>{
            // response.send(data)
            response.render('petListUserPick', { data: data.Pets })
        })
        .catch(res=>{
            response.send(res)
        })
    }
    static showUnselected(request,response){
        let userId= request.session.user.userId
        let dataPet=[]
        AdopterPet.findAll(
            {where:{id:{[Op.ne]:userId}}, include:Pet, order:[['id','asc']]})
            // where:{CastId:naomiScottId}, include:Movie
    .then(data=>{
        // response.send(data[0])
        dataPet=data
        return Adopter.findByPk(userId)
    })  
    .then(res=>{
        response.render('petListUser',{data:dataPet, res})
    })
    .catch(err=>{
        response.send(err)
    })
    }
}






module.exports=Controller