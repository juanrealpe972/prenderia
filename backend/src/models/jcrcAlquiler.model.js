import mongoose from "mongoose";

const validarAlquiler = new mongoose.Schema(
  {
    valor: {
      type: Number,
      required: true,
    },
    fecha: {
      type: Date,
      required:true,
    },
    meses: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    interes: {
      type: Number,
      required: true,
    },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cliente",
      required: true,
    },
    articulo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "articulo",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Alquiler", validarAlquiler);
