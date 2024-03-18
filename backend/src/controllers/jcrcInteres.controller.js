import { validationResult } from "express-validator";
import Interes from "../models/jcrcInteres.model.js";

export const createInteres = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { meses, fecha, valor, alquiler, estado } = req.body;
    const newInteres = new Interes({
      meses,
      fecha,
      valor,
      alquiler,
      estado,
    });
    const saveInteres = await newInteres.save();
    if (saveInteres) {
      res.status(200).json({ message: "Interes registrado con exito" });
    } else {
      res.status(500).json({ message: "Error al registrar el interes" });
    }
  } catch (error) {
    res.status(500).json({ message: " Error en el sistema" + error });
  }
};

export const getIntereses = async (req, res) => {
  try {
    const interes = await Interes.find({});
    if (interes.length > 0) {
      res
        .status(200)
        .json({ message: "Intereses encontrados: ", data: interes });
    } else {
      res.status(400).json({ message: "No se encontraron intereses" });
    }
  } catch (error) {
    res.status(500).json({ message: " Error en el sistema" + error });
  }
};

export const updateInteres = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const id = req.params.id;
    const updateInteres = await Interes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updateInteres) {
      res.status(200).json({ message: "Interes actualizado con exito" });
    } else {
      res.status(400).json({ message: "Error al actualizar el interes" });
    }
  } catch (error) {
    res.status(500).json({ message: " Error en el sistema" + error });
  }
};

export const getInteres = async (req, res) => {
  try {
    const id = req.params.id;
    const interes = await Interes.findById(id);
    if (interes) {
      res.status(200).json({ message: "Interes encontrado: ", data: interes });
    } else {
      res
        .status(400)
        .json({ message: "Error al encontrar el interes con el id" });
    }
  } catch (error) {
    res.status(500).json({ message: " Error en el sistema" + error });
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
    res.status(500).json({ message: " Error en el sistema" + error });
  }
};

export const totalInteres = async (req, res) => {
  try {
    const { mes, anio } = req.body;

    const interesmesanio = await Interes.find({
      estado: "pagado",
    });

    const totalIntereses = interesmesanio.reduce((total, interes) => {
      const fechaInteres = new Date(interes.fecha);
      if (fechaInteres.getMonth() + 1 === parseInt(mes) && fechaInteres.getFullYear() === parseInt(anio)) {
        total += interes.valor;
      }
      return total;
    }, 0);

    if (totalIntereses > 0) {
      res.status(200).json({ mensaje: `Total de intereses para ${mes}-${anio} es:`, recaudado: totalIntereses });
    } else {
      res.status(200).json({ mensaje: `No hay intereses recaudados para ${mes}-${anio}.` });
    }

  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el sistema" + error });
  }
}

export const interesPendiente = async (req, res) => {
  try {
    const { id } = req.params;
    const interesesPendientes = await Interes.find({
      alquiler: id,
      estado: "sin pagar",
    });

    if (interesesPendientes.length > 0) {
      let totalMeses = 0;
      let totalValor = 0;

      interesesPendientes.forEach((interes) => {
        totalMeses++;
        totalValor += interes.valor;
      });

      res.status(200).json({ 
        "Total de meses pendientes sin pagar": totalMeses,
        "Total del valor pendiente sin pagar": totalValor
      });
    } else {
      res.status(404).json({ mensaje: "No hay intereses pendientes para este alquiler" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el sistema" + error });
  }
}
