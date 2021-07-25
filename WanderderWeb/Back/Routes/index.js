const express= require('express')
const router = express.Router();


const actions =require('../Methods/authActions');
router.post('/register',actions.register)
router.post('/login',actions.login)
router.post('/autoLogin',actions.autoLogin)
router.post('/logout',actions.logout)
router.post('/resetPassword',actions.resetPassword)
router.post('/confirmCode',actions.confirmCode)
router.post('/changePassword',actions.changePassword)


module.exports = router