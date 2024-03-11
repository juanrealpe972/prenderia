import Alquiler from "../models/jcrcAlquiler.model.js";

export const createAlquiler = async (req, res) => {
  try {
    const { valor, meses, descripcion, interes, cliente, articulo } = req.body;
    const newAlquiler = new Alquiler({
      valor,
      meses,
      descripcion,
      interes,
      cliente,
      articulo,
    });
    const saveAlquiler = await newAlquiler.save();
    if (saveAlquiler) {
      res.status(200).json({ message: "Alquiler creado con exito" });
    } else {
      res.status(404).json({ message: "No se pudo registrar el alquiler" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAlquiler = async (req, res) => {
  try {
    const id = req.params.id;
    const alquiler = await Alquiler.findById(id);
    if (!alquiler) {
      return res.status(404).json({ message: "El alquiler no existe" });
    }
    res.status(200).json(alquiler);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateAlquiler = async (req, res) => {
  try {
    const id = req.params.id;
    const alquiler = await Alquiler.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (alquiler) {
      res.status(200).json({ message: "Alquiler actualizado con exito" });
    } else {
      res.status(400).json({ message: "No se pudo actualizar el Alquiler" });
    }
  } catch (error) {
    res.status(500).json(error);
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
    res.status(500).json(error);
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
    res.status(500).json(error);
  }
};

export const alquileresPagados = async (req, res) => {
  try {
    const cliente = req.params.id;
    const alquileres = await Alquiler.find({ cliente })
      .populate("cliente", "nombres")
      .populate("articulo", "nombre")
      .select("mes valor interes");
    if (alquileres.length > 0) {
      res.status(200).json({ message: "Alquileres pagados", data: alquileres });
    } else {
      res.status(400).json({ message: "No se pudo encontrar el usuario" });
    }
  } catch (error) {
    res.status(200).json(error);
  }
};

export const interesPendiente = async (req, res) => {
  try {
    const alquiler = await Alquiler.findById({_id}).select("mes valor interes"); 
    const interesPendiente = alquiler.valor - alquiler.interes;
    if (interesPendiente) {
      res.status(200).json({ message: "Intereses pendientes: ", data: interesPendiente });
    } else {
      res.status(400).json({ message: "No hay intereses pendientes" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
