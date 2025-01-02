import usersModel, { IUser } from "../models/users_model";
import BaseController from "./base_controller";

const usersController = new BaseController<IUser>(usersModel);

export default usersController