import mongoose from "mongoose";

const validarCliente = new mongoose.Schema(
  {
    identificacion: {
      type: Number,
      required: true,
      thim: true,
      unique: true,
    },
    nombres: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      thim: true,
    },
    fecha_nac: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cliente", validarCliente);
