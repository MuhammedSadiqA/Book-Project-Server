// import express
const express = require('express')
const userController = require('../controllerLogic/userControllerLogic')

// create Router object
const router = express.Router()

// define path for client api request
// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.logincontroller)
// googlelogin
router.post('/google/sign-in',userController.googleLogincontroller)

module.exports = router
