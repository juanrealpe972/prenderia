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
      res.status(200).json({ message: "Cliente registrado con exito" });
    } else {
      res.status(404).json({ message: "Error al registrar el cliente" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getClient = async (req, res) => {
  try {
    const id = req.params.id;
    const clientFound = await Cliente.findById(id);
    if (!clientFound) {
      return res.status(404).json({  message: "Error no se encontro el cliente con el id",});
    } else {
      return res.json({ message :"Cliente encontrado", data: clientFound });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getClients = async (req, res) => {
  try {
    const clientFound = await Cliente.find({});
    if (!clientFound) {
      res.status(404).json({ message: "No se encontron clientes" });
    } else {
      res.status(200).json({message:"Clientes encontrados", data:clientFound});
    }
  } catch (error) {
    res.status(500).json(error);
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
      res.status(200).json({ message: "Cliente actualizado con exito" });
    } else {
      res.status(404).json({message: "Error al actualizar el cliente"});
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteClient = await Cliente.findByIdAndDelete(id);
    if (deleteClient) {
      res.status(200).json({ message: "Cliente eliminado con exito" });
    } else {
      res.status(404).json({ message: "Error al eliminar el cliente" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
