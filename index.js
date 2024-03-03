import  express  from "express";
import DB_connection from './src/database/database.js'
import * as dotenv from 'dotenv'
import router from "./src/routes/user_routes.js";
import admin_route from './src/routes/admin_route.js'
import customError from "./src/error/error.js";
import Token_verify from "./src/middleware/authenticate.js";
import session from "express-session";
dotenv.config()
const signature = process.env.TOKEN_SIGNATURE
const port=4000
const app = express()

DB_connection()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:signature,
    resave: false,
    saveUninitialized: true,
}));
app.use('/api',router)
app.use('/api',admin_route)

app.use(customError)
app.listen(port,()=>console.log(port))