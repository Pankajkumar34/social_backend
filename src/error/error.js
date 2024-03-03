const customError=(err,req,res,next)=>{

if(err){
  const error={
    statusCode:err.statusCode || 500,
    message:err.message || "Backend Error",
    status:false
  }
  return res.json(error)
}
}
export default customError