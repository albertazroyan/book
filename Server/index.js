import express from 'express'
import session from 'express-session'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import path from 'path'
import { connectDB } from './src/config/dbconnect.js' 
import { authentication, routerMongoDb } from './src/routers/index.js'
import cors from 'cors'
import i18next from "i18next"
import Backend from "i18next-fs-backend"
import middleware from "i18next-http-middleware"
import bodyParser  from "body-parser"
import cookieParser from "cookie-parser"
import secure from 'express-force-https'

i18next.use(Backend).use(middleware.LanguageDetector)
.init({
    fallbackLng:"en",
    backend:{
        loadPath:"./locales/{{lng}}/translations.json"
    }
})

const app = express()
app.use(secure)
connectDB()

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // store: MongoStore.create({ mongoUrl: process.env.MONGODB, collectionName: "sessions" }),
  cookie: {
      maxAge: 1000 * 60 * 60 * 24
  }
}))
app.use(cookieParser("secretcode"))
// app.use('/api/', express.static(path.join(__dirname,'uploads')));
// app.use(express.static('./methods-public'))
app.use(middleware.handle(i18next));
// app.use(fileUpload());
app.use(express.urlencoded({extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(cors({
  origin:"http://localhost:3000", 
  credentials: true
}))
app.use(passport.initialize())
app.use(passport.session())
// console.log(process.env.TOKEN_SECRET)

const generateAccessToken = (param) => {
  return jwt.sign(param, process.env.TOKEN_SECRET, { expiresIn: '1800s'})
}

app.get('/api/ubdate', (req, res) => {
   const data = {
     name:"hello",
     username:"chelo"
   }
   const tokem = generateAccessToken(data)
 
   res.send(tokem)
})

app.use('/api/v1/', routerMongoDb)
app.use('/api/v1/', authentication)

app.use(express.static(path.resolve("./media")))
app.use(express.static(path.resolve("../client/build/")))
app.get('*', (req, res) => {
  res.sendFile(path.resolve("../client/build/index.html"));
})

const port = process.env.PORT || 8080;

app.listen(port)