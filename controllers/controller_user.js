const { Admin, Pet, Adopter, AdopterPet } = require('../models')

class Controller{
    static showPet(request,response){
        Pet.findAll()
        .then(data=>{
            response.render('petListUser.ejs',{data})
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
            independent:userIndependent,
            spacious:userSpacious,
            friendly:userFriendly
        }


        

        response.send(obj)
    }

//====================================          PILIH           ==================================       
    // static pick(request,response){
    //     let id = request.params.petId
    //     AdopterPet.create(
    //         {
    //             AdopterId:req,
    //             PetId: request.params.id
    //         }
    //     )
    // }
}






module.exports=Controller