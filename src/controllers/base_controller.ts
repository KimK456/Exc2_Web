/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { Model } from "mongoose";

class BaseController<T> {
    model: Model<T>;
    constructor(model: any) {
        this.model = model;
    }

    async getAll(req: Request, res: Response) {
        const filter = req.query.owner;
        console.log("get all")
        try {
            if (filter) {
                const item = await this.model.find({ owner: filter });
                res.send(item);
            } else {
                const items = await this.model.find();
                res.send(items);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    };

    async getById(req: Request, res: Response) {
        const id = req.params.id;

        try {
            const item = await this.model.findById(id);
            if (item != null) {
                res.send(item);
            } else {
                res.status(404).send("not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    };

    async create(req: Request, res: Response): Promise<void> {
        try {
            const userId  = req.params.userId;
            const data = {
                ...req.body,
                "user": userId
            };
            const item = await this.model.create(data);
            res.status(201).send(item);
        } catch (error) {
            res.status(400).send(error);
        }
    };

    async deleteItem(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const item = await this.model.findByIdAndDelete(id);
            res.status(200).send("deleted");
        } catch (error) {
            res.status(400).send(error);
        }
    };

    async updateItem(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const data = req.body
            const item = await this.model.findByIdAndUpdate(id, data);
            res.status(201).send(item);
        } catch (error) {
            res.status(400).send(error);
        }
    };

}


export default BaseController