const express = require('express')
const app = express()
const port = 3000




app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.listen(port,()=>{
    console.log('now listening to : ',port)
})





const adminRouter = require ('./routes/admin_router')
app.use('/admin', adminRouter)

const userRouter = require('./routes/user_router')
app.use('/users',userRouter)