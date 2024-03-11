import Interes from "../models/jcrcInteres.model.js";

export const createInteres = async (req, res) => {
  try {
    const { meses, valor, alquiler } = req.body;
    const newInteres = new Interes({
      meses,
      valor,
      alquiler,
    });
    const saveInteres = await newInteres.save();
    if (saveInteres) {
      res.status(200).json({ message: "Interes registrado con exito" });
    } else {
      res.status(500).json({ message: "No se pudo registrar el interes" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getIntereses = async (req, res) => {
  try {
    const interes = await Interes.find({});
    if (interes.length > 0) {
      res.status(200).json({ message: "Intereses encontrados", data: interes });
    } else {
      res.status(400).json({ message: "No se encontraron intereses" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateInteres = async (req, res) => {
  try {
    const id = req.params.id;
    const updateInteres = await Interes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updateInteres) {
      res.status(200).json({ message: "Interes actualizado con exito" });
    } else {
      res.status(400).json({ message: "no se pudo actualizar el interes" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getInteres = async (req, res) => {
  try {
    const id = req.params.id;
    const interes = await Interes.findById(id);
    if (interes) {
      res.status(200).json({ message: "Interes encontrado", data: interes });
    } else {
      res.status(400).json({ message: "No se pudo encontrar el interes" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteInteres = async (req, res) => {
  try {
    const id = req.params.id;
    const interes = await Interes.findByIdAndDelete(id);
    if (interes) {
      res.status(200).json({ message: "Interes eliminado con exito" });
    } else {
      res.status(400).json({ message: "Error al eliminar el interes" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const totalInteres = async (req, res) => {
  try {
    const total = await Interes.aggregate([
      { $match: { mes: req.params.mes, anio: req.params.fecha } },
      { $group: { _id: null, total: { $sum: "$interes" } } },
    ]);
    if (total) {
      res.status(200).json({ message: "Total de intereses", data: total });
    }else {
      res.status(400).json({message:"No se encontraron intereses pagados, estas perdiendo"})
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
