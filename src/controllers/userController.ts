import { Request, Response } from "express";
import User from "../entity/user";

export let allUsers = (req: Request, res: Response) => {
	let users = User.find((err: any, users: any) => {
		if (err) {
		res.send("Error!");
		} else {
		res.send(users);
		}
	});
};
    

	export let getUser = (req: Request, res: Response) => {
		let photo = User.findById(req.params.id, (err: any, photo: any) => {
			if (err) {
			res.send(err);
			} else {
			res.send(photo);
			}
		});
	};

	export let deleteUser = (req: Request, res: Response) => {
		let photo = User.deleteOne({ _id: req.params.id }, (err: any) => {
			if (err) {
			res.send(err);
			} else {
			res.send("Succesfully Deleted Book");
			}
		});
	};

  export let updateUser = (req: Request, res: Response) => {
    let photo = User.findByIdAndUpdate(
			req.params.id,
			req.body,
			(err: any, photo: any) => {
			if (err) {
					res.send(err);
			} else {
					res.send("Succesfully updated photo!");
			}
    });
  };

  export let addUser = (req: Request, res: Response) => {
	  console.log("req.body", req.files)
	  console.log("req.body", req)
    var photo = new User(req.body);
			photo.save((err: any) => {
				if (err) {
				res.send(err);
				} else {
				res.send(photo);
			}
		});
  };
