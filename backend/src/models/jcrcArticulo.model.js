import mongoose from "mongoose";

const validarArticulo = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      enum: ["Vehiculo", "Oro", "Electrodomestico", "Maquina", "Herramienta"],
      required: true,
    },
    estado: {
      type: String,
      enum: ["activo", "desactivado"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Articulo", validarArticulo);
