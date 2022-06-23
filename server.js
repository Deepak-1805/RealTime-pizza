require('dotenv').config()
const express=require('express')
const app=express()
const ejs=require('ejs')
const path=require('path')
const expressLayout=require('express-ejs-layouts')
const PORT=process.env.PORT||3000
const mongoose =require('mongoose');
const session=require('express-session')
const flash=require('express-flash')
const MongoStore=require('connect-mongo')
const passport=require('passport')
// const {MongoClient} = require('mongodb');
// //Database connection
const url='mongodb://localhost:27017/pizza';
// const database='pizza'
// const client=new MongoClient(url);
// async function getData()
// {
//     let result=await client.connect();
//     let db=result.db(database);
//     let collection=db.collection('menu');
//     let response=await collection.find({}).toArray();
//     console.log('Database connected...')
//     console.log(response);
    
// }
// getData();
mongoose.connect(url);
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log('Database Connected...');
});

//session config
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    store: MongoStore.create({
        mongoUrl:url
    }), 
    saveUninitialized:false,
  cookie: {maxAge: 1000 * 60 * 60 * 24}//24hrs
}))
//passport config
const passportInit=require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
//assests
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
//global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.user=req.user
    next()
})
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)

app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
})