import * as express from "express";
import * as bodyParser from "body-parser";
import * as bookController from "./controllers/bookController";

// Our Express APP config
const app = express();
app.use(bodyParser.json());
app.set("port", process.env.PORT || 4000);

// API Endpoints
app.get("/", bookController.allBooks);
app.get("/{id}", bookController.getBook);
app.post("/", bookController.addBook);
app.put("/{id}", bookController.updateBook);
app.delete("/{id}", bookController.deleteBook);

// app.get("/",(req,res)=>{
//     res.send("hello")
// });

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});