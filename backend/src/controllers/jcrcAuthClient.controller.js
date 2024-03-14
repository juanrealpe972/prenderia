import { validationResult } from "express-validator";
import { AUT_TOKEN_SECRET } from "../../config.js";
import { createAccessToken } from "../middlewares/jcrcvalidateToken.js";
import Cliente from "../models/jcrcClient.model.js";
import jwt from "jsonwebtoken"; 

export const validarCliente = async (req, res) => {
  try {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json(errors)
    }

    const { identificacion, password } = req.body;
    const cliente = await Cliente.findOne({ identificacion, password });
    if (!cliente) {
      res.status(404).json({ message: "Error no se encontro el cliente" });
    } else if (cliente) {
      let token = await createAccessToken({ id: cliente._id });
      res.status(200).json({ client: cliente, token, message: "Cliente validado" });
    } else {
      res
        .status(404)
        .json({ message: "Identificación o password incorrectos" });
    }
  } catch (error) {
    res.status(500).json({message: `Error en el sistema + error`});
  }
};

export const validarToken = async (req, res, next) => {
  try {
    const token_secret = req.headers["token"];
    if (!token_secret) {
      res.status(403).send({ message: "Token requerido" });
    } else {
      jwt.verify(token_secret, AUT_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "No autorizado" });
        } else {
          next();
        }
      });
    }
  } catch (error) {
    res.status(500).json({message: `Error en el sistema + error`});
  }
};
