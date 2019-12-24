import { Request, Response } from "express";
import Book from "../entity/book";

export let allBooks = async (req: Request, res: Response) => {
	
	let skip = +req.query.page;
	skip = skip*10
	let limit =  +req.query.size
	let totalcount :any
	await Book.find().countDocuments({},  function( err, count){
		if (err) {
			res.send("Error!");
		} else {
			totalcount = count	
		}
	
	})
	await Book.find ((err: any, books: any) => {
		if (err) {
			res.send("Error!");
		} else {
			res.send({books: books, count:totalcount});
		}
	}).skip(skip).limit(limit).sort({ _id: -1 });
	
};


export let getBook = (req: Request, res: Response) => {
	let book = Book.findById(req.params.id, (err: any, book: any) => {
		if (err) {
			res.send(err);
		} else {
			res.send(book);
		}
	});
};

export let deleteBook = (req: Request, res: Response) => {
	let book = Book.deleteOne({ _id: req.params.id }, (err: any) => {
		if (err) {
			res.send(err);
		} else {
			res.send({success: true, status:200, message:"Succesfully Deleted Book"});
		}
	});
};

export let updateBook = (req: Request, res: Response) => {
	let book = Book.findByIdAndUpdate(
		req.params.id,
		req.body,
		(err: any, book: any) => {
			if (err) {
				res.send(err);
			} else {
				res.send("Succesfully updated book!");
			}
		});
};

export let addBook = (req: Request, res: Response) => {
	console.log("req.body", req.body)
	let book:any;
	if (req.body._id) {
		book = Book.findByIdAndUpdate(
			req.body._id,
			req.body,
			(err: any, book: any) => {
				if (err) {
					res.send(err);
				} else {
					res.send(req.body);
				}
			});
	} else {
		book = new Book(req.body);
		book.save((err: any) => {
			if (err) {
				res.send(err);
			} else {
				res.send(book);
			}
		});
	}

};
