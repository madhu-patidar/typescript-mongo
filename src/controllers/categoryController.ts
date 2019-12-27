import { Request, Response } from "express";
import Category from "../entity/category";

export let allCategories = async (req: Request, res: Response) => {
	
	let skip = +req.query.page;
	skip = skip*10
	let limit =  +req.query.size
	let totalcount :any
	await Category.find().countDocuments({},  function( err, count){
		if (err) {
			res.send("Error!");
		} else {
			totalcount = count	
		}
	
	})
	await Category.find ((err: any, categories: any) => {
		if (err) {
			res.send("Error!");
		} else {
			res.send({categories: categories, count:totalcount});
		}
	}).skip(skip).limit(limit).sort({ _id: -1 });
	
};


export let getCategory = (req: Request, res: Response) => {
	let category = Category.findById(req.params.id, (err: any, category: any) => {
		if (err) {
			res.send(err);
		} else {
			res.send(category);
		}
	});
};

export let deleteCategory = (req: Request, res: Response) => {
	let category = Category.deleteOne({ _id: req.params.id }, (err: any) => {
		if (err) {
			res.send(err);
		} else {
			res.send({success: true, status:200, message:"Succesfully Deleted category"});
		}
	});
};

export let updateCategory = (req: Request, res: Response) => {
	let category = Category.findByIdAndUpdate(
		req.params.id,
		req.body,
		(err: any, category: any) => {
			if (err) {
				res.send(err);
			} else {
				res.send("Succesfully updated category!");
			}
		});
};

export let addCategory = (req: Request, res: Response) => {
	console.log("req.body", req.body)
	let category:any;
	if (req.body._id) {
		category = Category.findByIdAndUpdate(
			req.body._id,
			req.body,
			(err: any, category: any) => {
				if (err) {
					res.send(err);
				} else {
					res.send(req.body);
				}
			});
	} else {
		category = new Category(req.body);
		category.save((err: any) => {
			if (err) {
				res.send(err);
			} else {
				res.send(category);
			}
		});
	}

};
