const { Admin, Pet, Adopter, AdopterPet } = require('../models')

class Controller{

    ////=========================== SHOW ALL PETS  =====================================================================================================
        

    static showPet(request,response){
        Pet.findAll({order:[['id','asc']]})
        .then(data=>{
            response.render('petList.ejs',{data})
        })
        .catch(err=>{
            response.send(err)
        })
    }


    //=============================ADD PET FORM=====================================================================================================
    static addPetForm(request,response){
        response.render('addPetForm.ejs')
    }

    //============================ [ INSERT PET INTO TABLE  ] =====================================================================================================
    
    static addPet (request,response){
        let obj={
            name:request.body.name,
            type:request.body.type,
            isIndependent: request.body.isIndependent,
            isSpacious:request.body.isSpacious,
            isFriendly:request.body.isFriendly,
            description:request.body.description,
            picture:request.body.picture,
            gender:request.body.gender,
            contactNumber:request.body.contactNumber,
            age:Number(request.body.age)
        }
        console.log(obj)
        Pet.create(obj)
        .then(res=>{
            response.redirect('/admin')
        })
    }
    //=============================EDIT FORMS=====================================================================================================
    static editForm(request,response){
        let id = request.params.id
        Pet.findByPk(id)
        .then(data=>{
            response.render('editPetForm.ejs',{data})
        })
        .catch(err=>{
            response.send(err)
        })
    }

    //=========================== EDIT DATA INTO TABLE ===========================================================================================

    static editPet(request,response){
        let id = request.params.id
        Pet.update({
            name:request.body.name,
            type:request.body.type,
            isIndependent: request.body.isIndependent,
            isSpacious:request.body.isSpacious,
            isFriendly:request.body.isFriendly,
            description:request.body.description,
            picture:request.body.picture,
            gender:request.body.gender,
            contactNumber:request.body.contactNumber,
            age:Number(request.body.age)
        },{where:{id}})
        .then(data=>{
            response.redirect('/admin')
        })
        .catch(err=>{
            response.send(err)
        })
    }

    static deletePet (request,response){
        let id = request.params.id
        Pet.destroy({where:{id}})
        response.redirect('/admin')
    }
}



module.exports = Controller