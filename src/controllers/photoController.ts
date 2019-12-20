import { Request, Response } from "express";
import Photo from "../entity/photo";

export let allPhotos = (req: Request, res: Response) => {
	let photos = Photo.find((err: any, photos: any) => {
		if (err) {
		res.send("Error!");
		} else {
		res.send(photos);
		}
	});
};
    

	export let getPhoto = (req: Request, res: Response) => {
		let photo = Photo.findById(req.params.id, (err: any, photo: any) => {
			if (err) {
			res.send(err);
			} else {
			res.send(photo);
			}
		});
	};

	export let deletePhoto = (req: Request, res: Response) => {
		let photo = Photo.deleteOne({ _id: req.params.id }, (err: any) => {
			if (err) {
			res.send(err);
			} else {
			res.send("Succesfully Deleted Book");
			}
		});
	};

  export let updatePhoto = (req: Request, res: Response) => {
    let photo = Photo.findByIdAndUpdate(
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

  export let addPhoto = (req: Request, res: Response) => {
	  console.log("req.body", req.files)
	  console.log("req.body", req.file)
    var photo = new Photo(req.body);
			photo.save((err: any) => {
				if (err) {
				res.send(err);
				} else {
				res.send(photo);
			}
		});
  };
