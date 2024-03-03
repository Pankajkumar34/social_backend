import express from 'express'

const router=express.Router()

router.get('/',async(req,res)=>{
   try {
    res.status(200).json({status:"Online", message:"Hello",route:"user"})
   } catch (error) {
 console.log(error)
   }
})

// router.post('/admin_create',user_controller.admin_create)
export default router