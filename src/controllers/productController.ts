import { Request, Response } from "express";
import Product from "../entity/product";

export let allProducts = async (req: Request, res: Response) => {
	
	let skip = +req.query.page;
	skip = skip*10
	let limit =  +req.query.size
	let totalcount :any
	await Product.find().countDocuments({},  function( err, count){
		if (err) {
			res.send("Error!");
		} else {
			totalcount = count	
		}
	
	})
	await Product.find ((err: any, products: any) => {
		if (err) {
			res.send("Error!");
		} else {
			res.send({products: products, count:totalcount});
		}
	}).skip(skip).limit(limit).sort({ _id: -1 });
	
};


export let getProduct = (req: Request, res: Response) => {
	let product = Product.findById(req.params.id, (err: any, product: any) => {
		if (err) {
			res.send(err);
		} else {
			res.send(product);
		}
	});
};

export let deleteProduct = (req: Request, res: Response) => {
	let product = Product.deleteOne({ _id: req.params.id }, (err: any) => {
		if (err) {
			res.send(err);
		} else {
			res.send({success: true, status:200, message:"Succesfully Deleted product"});
		}
	});
};

export let updateProduct = (req: Request, res: Response) => {
	let product = Product.findByIdAndUpdate(
		req.params.id,
		req.body,
		(err: any, product: any) => {
			if (err) {
				res.send(err);
			} else {
				res.send("Succesfully updated product!");
			}
		});
};

export let addProduct = (req: Request, res: Response) => {
	console.log("req.body", req.body)
	let product:any;
	if (req.body._id) {
		product = Product.findByIdAndUpdate(
			req.body._id,
			req.body,
			(err: any, product: any) => {
				if (err) {
					res.send(err);
				} else {
					res.send(req.body);
				}
			});
	} else {
		product = new Product(req.body);
		product.save((err: any) => {
			if (err) {
				res.send(err);
			} else {
				res.send(product);
			}
		});
	}

};
