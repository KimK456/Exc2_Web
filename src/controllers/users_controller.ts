import usersModel, { IUsers } from "../models/users_model";
import BaseController from "./base_controller";

const usersController = new BaseController<IUsers>(usersModel);

export default usersController