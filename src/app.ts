import * as express from "express";
import * as bodyParser from "body-parser";
import * as bookController from "./controllers/bookController";

// Our Express APP config
const app = express();
app.use(bodyParser.json());
app.set("port", process.env.PORT || 4000);

// API Endpoints
app.get("/books", bookController.allBooks);
app.get("/book/:id", bookController.getBook);
app.post("/book", bookController.addBook);
app.put("/book/:id", bookController.updateBook);
app.delete("/book/:id", bookController.deleteBook);

app.get("/",(req,res)=>{
    res.send("hello")
});

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});