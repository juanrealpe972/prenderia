import { validationResult } from "express-validator";
import Alquiler from "../models/jcrcAlquiler.model.js";
import Interes from "../models/jcrcInteres.model.js";
import Cliente from "../models/jcrcClient.model.js";
import Articulo from "../models/jcrcArticulo.model.js";

export const createAlquiler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { valor, fecha, meses, descripcion, interes, cliente, articulo } =
      req.body;
    const newAlquiler = new Alquiler({
      valor,
      fecha,
      meses,
      descripcion,
      interes,
      cliente,
      articulo,
    });
    const saveAlquiler = await newAlquiler.save();
    if (saveAlquiler) {
      res.status(200).json({ message: "Alquiler registrado con exito" });
    } else {
      res.status(404).json({ message: "Error al registrar el alquiler" });
    }
  } catch (error) {
    res.status(500).json({ message: " Error en el sistema" + error });
  }
};

export const getAlquiler = async (req, res) => {
  try {
    const id = req.params.id;
    const alquiler = await Alquiler.findById(id);
    if (!alquiler) {
      return res
        .status(404)
        .json({ message: "Error no se encontro el alquiler con el id" });
    } else {
      res
        .status(200)
        .json({ message: "alquiler encontrado: ", data: alquiler });
    }
  } catch (error) {
    res.status(500).json({ message: " Error en el sistema" + error });
  }
};

export const updateAlquiler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const id = req.params.id;
    const alquiler = await Alquiler.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (alquiler) {
      res.status(200).json({ message: "Alquiler actualizado con exito" });
    } else {
      res.status(400).json({ message: "Error al actualizar el alquiler" });
    }
  } catch (error) {
    res.status(500).json({ message: " Error en el sistema" + error });
  }
};

export const getAlquilers = async (req, res) => {
  try {
    const alquiler = await Alquiler.find({});
    if (alquiler.length > 0) {
      res
        .status(200)
        .json({ message: "Alquileres encontrados", data: alquiler });
    } else {
      res.status(400).json({ message: "No se encontraron alquileres" });
    }
  } catch (error) {
    res.status(500).json({ message: " Error en el sistema" + error });
  }
};

export const deleteAlquiler = async (req, res) => {
  try {
    const id = req.params.id;
    const alquiler = await Alquiler.findByIdAndDelete(id);
    if (alquiler) {
      res.status(200).json({ message: "Alquiler eliminado con exito" });
    } else {
      res.status(400).json({ message: "Error al eliminar el alquiler" });
    }
  } catch (error) {
    res.status(500).json({ message: " Error en el sistema" + error });
  }
};

export const alquileresPagados = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id, "nombres");
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    const alquileres = await Alquiler.find( { cliente: id }, "valor meses articulo").populate('articulo', 'nombre');

    let interesesPagados = [];
    for (const alquiler of alquileres) {
      const intereses = await Interes.find(
        { alquiler: alquiler._id, estado: "pagado" },
        "meses valor"
      );
      interesesPagados = interesesPagados.concat(intereses);
    }

    if (alquileres.length === 0) {
      return res.json({ mensaje: "A este cliente no le han pagado intereses" });
    }

    return res.json({
      message: "interés pagados de los alquiler de un cliente",
      cliente: cliente.nombres,
      alquileres,
      intereses: interesesPagados,
    });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el sistema" + error });
  }
};
