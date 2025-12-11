// import express
const express = require('express')
const userController = require('../controllerLogic/userControllerLogic')
const bookController =require('../controllerLogic/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

// create Router object
const router = express.Router()

// define path for client api request
// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.logincontroller)
// googlelogin
router.post('/google/sign-in',userController.googleLogincontroller)

// Authorised User
// add book
router.post('/user/book/add',jwtMiddleware,bookController.addBookController)

module.exports = router
