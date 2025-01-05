import commentsModel, { IComments } from "../models/comments_model";
import { Request, Response } from "express";
import BaseController from "./base_controller";

class CommentsController extends BaseController<IComments>{
    
    constructor() {
        super(commentsModel);
    }

    async getByPostId(req: Request, res: Response) {
            const id = req.params.id;
    
            try {
                const item = await this.model.find({ postId : id});
                if (item != null) {
                    res.send(item);
                } else {
                    res.status(404).send("not found");
                }
            } catch (error) {
                res.status(400).send(error);
            }
    };
}

export default new CommentsController()