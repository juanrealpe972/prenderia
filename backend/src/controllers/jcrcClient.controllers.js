import { validationResult } from "express-validator";
import Cliente from "../models/jcrcClient.model.js";
// import bcrypt from "bcryptjs";

export const createClient = async (req, res) => {
  try {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json(errors)
    }

    const {identificacion, nombres, direccion, telefono, fecha_nac, password} = req.body;
    // const passwordHash = await bcrypt.hash(password, 10);

    const newClient = new Cliente({
      identificacion,
      nombres,
      direccion,
      telefono,
      fecha_nac,
      password
    //   password: passwordHash,
    });

    const ClienteSave = await newClient.save();

    if (ClienteSave) {
      res.status(200).json({ mensaje: "Cliente registrado con exito" });
    } else {
      res.status(404).json({ mensaje: "Error al registrar el cliente" });
    }
  } catch (error) {
    res.status(500).json({message:"Error del sistema"})
  }
};

export const getClient = async (req, res) => {
  try {
    const id = req.params.id;
    const clientFound = await Cliente.findById(id);
    if (!clientFound) {
      return res.status(404).json({  mensaje: "Error no se encontro el cliente con el id",});
    } else {
      return res.json({ mensaje :"Cliente encontrado", data: clientFound });
    }
  } catch (error) {
    res.status(500).json({message:"Error del sistema"})
  }
};

export const getClients = async (req, res) => {
  try {
    const clientFound = await Cliente.find({});
    if (!clientFound) {
      res.status(404).json({ mensaje: "No se encontron clientes" });
    } else {
      res.status(200).json({mensaje:"Clientes encontrados", data:clientFound});
    }
  } catch (error) {
    res.status(500).json({message:"Error del sistema"})
  }
};

export const updateClient = async (req, res) => {
  try {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return  res.status(400).json(errors)
    }

    const id = req.params.id;
    const putClient = await Cliente.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (putClient) {
      res.status(200).json({ mensaje: "Cliente actualizado con exito" });
    } else {
      res.status(404).json({mensaje: "Error al actualizar el cliente"});
    }
  } catch (error) {
    res.status(500).json({message:"Error del sistema"})
  }
};

export const deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteClient = await Cliente.findByIdAndDelete(id);
    if (deleteClient) {
      res.status(200).json({ mensaje: "Cliente eliminado con exito" });
    } else {
      res.status(404).json({ mensaje: "Error al eliminar el cliente" });
    }
  } catch (error) {
    res.status(500).json({message:"Error del sistema"})
  }
};
