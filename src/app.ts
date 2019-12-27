import * as express from "express";
import * as bodyParser from "body-parser";
import * as bookController from "./controllers/bookController";
import * as photoController from "./controllers/photoController";
import * as userController from "./controllers/userController";
import * as productController from "./controllers/productController";
import * as categoryController from "./controllers/categoryController";


import * as mongoose from "mongoose";
import * as  multer from 'multer';
import * as path from 'path'
import { createDecipher } from "crypto";

// Our Express APP config
const app = express();
const cors = require('cors')
app.use(cors())
// const upload = multer({dest : "uploads/"})
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.set("port", process.env.PORT || 4000);

const uri: string = "mongodb://127.0.0.1:27017/express-mvp-db";

mongoose.connect(uri, { useNewUrlParser: true }, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Succesfully Connected!");
  }
});

const allowedExtentions = ['.png','.jpeg'];
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/upload'),
  filename: (req, file, cb)=> cb(null, `${Date.now}${file.originalname}`)
});

const upload = multer({
  storage,
  limits :{
    fieldSize: 100
  },
  fileFilter: (req, file, cb) =>{
    console.log('file',file)
    cb(null, allowedExtentions.includes(path.extname(file.originalname)))
  }

})
// API Endpoints
app.get("/books", bookController.allBooks);
app.get("/books/:id", bookController.getBook);
app.post("/books", bookController.addBook);
app.put("/books/:id", bookController.updateBook);
app.delete("/books/:id", bookController.deleteBook);

app.get("/products", productController.allProducts);
app.get("/products/:id", productController.getProduct);
app.post("/products", productController.addProduct);
app.put("/products/:id", productController.updateProduct);
app.delete("/products/:id", productController.deleteProduct);

app.get("/categories", categoryController.allCategories);
app.get("/categories/:id", categoryController.getCategory);
app.post("/categories", categoryController.addCategory);
app.put("/categories/:id", categoryController.updateCategory);
app.delete("/categories/:id", categoryController.deleteCategory);


app.get("/photos", photoController.allPhotos);
app.get("/photo/:id", photoController.getPhoto);
app.post("/photo", upload.array('files'), photoController.addPhoto);
app.put("/photo/:id", photoController.updatePhoto);
app.delete("/photo/:id", photoController.deletePhoto);

app.get("/users", userController.allUsers);
app.get("/users/:id", userController.getUser);
app.post("/users", upload.array('files'), userController.addUser);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

app.get("/",(req,res)=>{
    res.send("hello")
});

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});