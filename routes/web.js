const homecontroller = require('../app/http/controllers/homecontroller')
const authcontroller= require('../app/http/controllers/authcontroller')
const cartcontroller=require('../app/http/controllers/customers/cartcontroller')
const guest=require('../app/http/middlewares/guest')
const ordercontroller=require('../app/http/controllers/customers/ordercontroller')
function initroutes(app){
    app.get('/',homecontroller().index)
    app.get('/login',guest,authcontroller().login)
    app.post('/login',authcontroller().postLogin)
    app.get('/register',guest, authcontroller().register)
    app.post('/register',authcontroller().postRegister)
    app.post('/logout',authcontroller().logout)
    app.get('/cart',cartcontroller().index)
    app.post('/update-cart',cartcontroller().update)
   app.post('/orders',ordercontroller().store)
    
}
module.exports=initroutes
