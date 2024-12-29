import mongoose from "mongoose";

export interface IUsers {
  username: string;
  email: string;
}

const userSchema = new mongoose.Schema<IUsers>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model<IUsers>("Users", userSchema);

export default userModel;