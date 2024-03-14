import { validationResult } from "express-validator";
import Articulo from "../models/jcrcArticulo.model.js";

export const createArticulo = async (req, res) => {
  try {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json(errors)
    }

    const { nombre, tipo } = req.body;
    const newArticulo = new Articulo({
      nombre,
      tipo,
      estado,
    });
    const ArticuloSave = await newArticulo.save();
    if (ArticuloSave) {
      res.status(200).json({ message: "Articulo registrado con exito" });
    } else {
      res.status(404).json({ message: "Error al registrar el articulo" });
    }
  } catch (error) {
    res.status(500).json({message:" Error en el sistema" + error});
  }
};

export const getArticulo = async (req, res) => {
  try {
    const id = req.params.id;
    const articuloFound = await Articulo.findById(id)
    if(articuloFound){
        res.status(200).json({
          message:"Articulo encontrado", data:articuloFound
        });
    }else{
        res.status(404).json({message:"Error al encontrar el articulo con el id"})
    }
  } catch (error) {
    res.status(500).json({message:" Error en el sistema" + error});
  }
};

export const updateArticulo = async (req, res) => {
  try {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json(errors)
    }

    const id = req.params.id;
    const putArticulo = await Articulo.findByIdAndUpdate(id, req.body, {
        new: true
    })
    if(putArticulo){
        res.status(201).json({message:'Articulo actualizado con exito'});
    }else{
        res.status(404).json({message:'Error al actualizar el artículo'});
    }
  } catch (error) {
    res.status(500).json({message:" Error en el sistema" + error});
  }
};

export const getArticulos = async (req, res) => {
  try {
    const articuloFound = await Articulo.find({})
    if(articuloFound.length > 0){
      res.status(200).json({message:"Articulos encontrados: ", data:articuloFound});
    }else{
      res.status(404).json({message:"No se encontraron artículos"})
    }
  } catch (error) {
    res.status(500).json({message:" Error en el sistema" + error});
  }
};

export const activarArticuloStado = async (req, res) => {
  try {
    const id = req.params.id
    const activarArticulo = await Articulo.findByIdAndUpdate(id, {estado:"activo"}, {new: true})
    if(activarArticulo){
        res.status(200).json({message:"Estado activado con exito"})
    }else {
        res.status(400).json({message:"Error al activar el estado del articulo"})
    }
  } catch (error) {
    res.status(500).json({message:" Error en el sistema" + error});
  }
};

export const desactivarArticuloStado = async (req, res) => {
  try {
    const id = req.params.id
    const desactivarArticulo = await Articulo.findByIdAndUpdate(id, {estado:"desactivado"}, {new: true})
    if(desactivarArticulo){
        res.status(201).json({message:"Estado desactivado con exito"})
    } else {
        res.status(409).json({message:"Error al desactivar el estado del artículo"});
    }
  } catch (error) {
    res.status(500).json({message:" Error en el sistema" + error});
  }
};
