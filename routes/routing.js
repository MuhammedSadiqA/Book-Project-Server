// import express
const express = require('express')
const userController = require('../controllerLogic/userControllerLogic')
const bookController =require('../controllerLogic/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware=require('../middlewares/multerMiddleware')
// create Router object
const router = express.Router()

// define path for client api request
// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.logincontroller)
// googlelogin
router.post('/google/sign-in',userController.googleLogincontroller)

// ------------------Authorised User-------------------
// add book - request body content is formdata
router.post('/user/book/add',jwtMiddleware,multerMiddleware.array('uploadImages',3),bookController.addBookController)

module.exports = router
