import express from 'express'
import admin_controller from '../controller/admin_controller.js';
import Token_verify from '../middleware/authenticate.js';
const router=express.Router()

router.post('/admin_login',admin_controller.admin_login)
router.post('/admin_create',admin_controller.admin_create)
router.post('/logout',Token_verify,admin_controller.logout)
// <----------------------get admin ------------------------------------->
router.get('/get_admin',Token_verify,admin_controller.admin_get)


export default router