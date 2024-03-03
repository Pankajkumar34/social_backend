import mongoose from "mongoose";
const DB_connection =()=>{
    
    const databse_url= process.env.DATABASE_URL
    try {
   mongoose.connect(`${databse_url}`).then(res=>{
    if(res){
        console.log("database connected")
    }
   })
        
    } catch (error) {
        console.log("database not connected")
    }
}

export default  DB_connection;