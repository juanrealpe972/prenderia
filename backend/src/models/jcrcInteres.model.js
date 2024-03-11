import mongoose from "mongoose";

const validarInteres = new mongoose.Schema(
  {
    meses: {
      type: Number,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    valor: {
      type: Number,
      required: true,
    },
    alquiler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alquiler",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Interes", validarInteres);
