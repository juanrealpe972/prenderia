import mongoose from "mongoose";

const validarAuth = new mongoose.Schema(
  {
    identificacion: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {timestamps:true}
);

export default mongoose.model("Auth", validarAuth)