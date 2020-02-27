const express= require ('express')
const Router = express.Router()
const Controller = require ('../controllers/controller_user')

Router.get('/',Controller.showPet)
Router.get('/petlist/:id',Controller.detail)
// Router.get('/pick/:petId',Controller.pick)


// Router.post('/edit/:id',Controller.editForm)

module.exports = Router