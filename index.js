// import express,dotenv,cors
// Loa
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router=require('./routes/routing')

// create server using express
const bookstoreServer = express()
bookstoreServer.use(cors())
// add json parser to server
bookstoreServer.use(express.json())

// use router in server
bookstoreServer.use(router)


// create a port where server should listen in web
const PORT =3000

// server listen in that port
bookstoreServer.listen(PORT,()=>{
    console.log("Server started");
    
})

// resolve http get request to http://localhost:3000/ using server
bookstoreServer.get('/',(req,res)=>{
    res.status(200).send("Server started")
})