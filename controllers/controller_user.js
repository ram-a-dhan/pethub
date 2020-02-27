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