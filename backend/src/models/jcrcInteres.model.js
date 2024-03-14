import mongoose from "mongoose";

const validarInteres = new mongoose.Schema(
  {
    meses: {
      type: Number,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
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
    estado: {
      type: String,
      enum: ["pagado", "sin pagar"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Interes", validarInteres);
