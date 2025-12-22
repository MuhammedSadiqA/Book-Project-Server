const books = require('../models/bookModel')

// add book
exports.addBookController = async (req, res) => {
    console.log("Inside addBookController");
    // get books details from req body,upload file from request files & seller mail from req payload

    const { title, author, pages, price, discountPrice, imageURL, abstract, language, publisher, isbn, category } = req.body

    const uploadImages = req.files.map(item => item.filename)

    const sellerMail = req.payload
    console.log(title, author, pages, price, discountPrice, imageURL, abstract, language, publisher, isbn, category, uploadImages, sellerMail);

    try {
        // check book already exists
        const existingUser = await books.findOne({ title, sellerMail })
        if (existingUser) {
            res.status(401).json("Upload Book Request failed!!! Uploaded book is already exists...")
        } else {
            const newBook = await books.create({
                title, author, pages, price, discountPrice, imageURL, abstract, language, publisher, isbn, category, uploadImages, sellerMail
            })
            res.status(200).json(newBook)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}



// get home books
exports.getHomePageBooksController = async (req, res) => {
    console.log("Inside getHomePageBooksController");
    try {
        // get newly added 4 books from db
        const homeBooks = await books.find().sort({ _id: -1 }).limit(4)
        res.status(200).json(homeBooks)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// get all books - user login user
exports.getUserAllBookPageController = async (req, res) => {
    console.log("Inside getUserAllBoook PageController");
    // get query from req
    const searchKey = req.query.search
    //console.log(searchKey);
    const loginUserMail = req.payload
    try {
        //get all books from db except loggedin user
        const allBooks = await books.find({
            sellerMail: { $ne: loginUserMail }, title:
                { $regex: searchKey, $options: 'i' }
        })
        res.status(200).json(allBooks)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// get all books-user
exports.getUserUploadBookProfilePageController = async (req, res) => {
    console.log("Inside getHomePageBooksController");
    // get login user mail form token 
    const loginUserMail = req.payload
    try {
        // get all books from db except loggedin user
        const allBooks = await books.find({ sellerMail: { $ne: loginUserMail } })
        res.status(200).json(allBooks)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// get all user bought books
exports.getUserBoughtBookProfilePageController = async (req, res) => {
    console.log("Inside getHomePageBooksController");
    // get login user mail form token 
    const loginUserMail = req.payload
    try {
        // get all books from db except loggedin user
        const allUserBooks = await books.find({ buyerMail: { $ne: loginUserMail } })
        res.status(200).json(allUserBooks)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// view a book
exports.viewBookController = async (req,res)=>{
    console.log("Inisde viewBookController");
    // get id from req
    const {id}=req.params
    // get Book Details of Given id from db
    try{
        const bookDetails=await books.findById({_id:id})
        res.status(200).json(bookDetails)

    }catch(error){
        console.log(error);
        res.status(500).json(error)

    }

    
}
