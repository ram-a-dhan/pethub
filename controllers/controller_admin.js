const { Admin, Pet, Adopter, AdopterPet } = require('../models')

class Controller{

    //=================================== LOGIN  =====================================================================================================
    static loginForm (req,res){
        res.render('home1.ejs')
    }

    
    static loginAdmin(req, res) {
        console.log('ini login admin')  
        let adminData = { 
            username: req.body.username,
            password: req.body.password
        }
        console.log(adminData)
        Admin.findOne({ where: adminData })
        .then(data => {
            if(data){
                req.session.user = {
                    username:data.username,
                    levelUser:data.levelUser,
                    userId:data.id
                }
                
                res.redirect('/admin')
            }
        })
        .catch(err => {
            console.log('gak masuk')
            res.send(err)
        })
    }

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