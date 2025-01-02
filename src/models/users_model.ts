import mongoose from "mongoose";

export interface IUsers {
  email: string;
  password: string;
  _id?: string;
  refreshToken?: string[];
}

const userSchema = new mongoose.Schema<IUsers>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: [String],
    default: [],
  }
});

const userModel = mongoose.model<IUsers>("Users", userSchema);

export default userModel;