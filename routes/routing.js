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
//get home books
router.get('/books/home',bookController.getHomePageBooksController )


// ------------------Authorised User-------------------
// add book - request body content is formdata
router.post('/user/book/add',jwtMiddleware,multerMiddleware.array('uploadImages',3),bookController.addBookController)

// get all books page -
router.get('/books/all',jwtMiddleware,bookController.getUserAllBookPageController)

// get all user upload books page - +
router.get('/user-books/all',jwtMiddleware,bookController.getUserUploadBookProfilePageController)

// get single books page - +
router.get('/books/:id/view',jwtMiddleware,bookController.viewBookController)

// user edit - request body  content is formdata
router.put('/user/:id/edit',jwtMiddleware,multerMiddleware.single('picture'),userController.updateUserProfileController)

module.exports = router
  