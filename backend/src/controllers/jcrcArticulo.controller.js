import Articulo from "../models/jcrcArticulo.model.js";

export const createArticulo = async (req, res) => {
  try {
    const { nombre, tipo } = req.body;
    const newArticulo = new Articulo({
      nombre,
      tipo,
      estado: "activo"
    });
    const ArticuloSave = await newArticulo.save();
    if (ArticuloSave) {
      res.status(200).json({ message: "Articulo registrado con exito" });
    } else {
      res.status(404).json({ message: "Error al registrar el articulo" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getArticulo = async (req, res) => {
  try {
    const id = req.params.id;
    const articuloFound = await Articulo.findById(id)
    if(articuloFound){
        res.status(200).json({
          message:"Articulo encontrado",
          nombre: articuloFound.nombre,
          tipo: articuloFound.tipo,
          estado: articuloFound.estado
        });
    }else{
        res.status(404).json({message:"No se encontro el articulo"})
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateArticulo = async (req, res) => {
  try {
    const id = req.params.id;
    const putArticulo = await Articulo.findByIdAndUpdate(id, req.body, {
        new: true
    })
    if(putArticulo){
        res.status(201).json({message:'Se actualizó correctamente'});
    }else{
        res.status(404).json({message:'No se encontró el artículo a actualizar'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getArticulos = async (req, res) => {
  try {
    const articuloFound = await Articulo.find({})
    if(articuloFound.length > 0){
      res.status(200).json({message:"Articulos encontrados", data:articuloFound});
    }else{
      res.status(404).json({message:"No hay artículos registrados"})
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const activarArticuloStado = async (req, res) => {
  try {
    const id = req.params.id
    const activarArticulo = await Articulo.findByIdAndUpdate(id, {estado:"activo"}, {new: true})
    if(activarArticulo){
        res.status(200).json({message:"Estado activado con exito"})
    }else {
        res.status(400).json({message:"No se pudo activar el estado del articulo"})
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const desactivarArticuloStado = async (req, res) => {
  try {
    const id = req.params.id
    const desactivarArticulo = await Articulo.findByIdAndUpdate(id, {estado:"desactivado"}, {new: true})
    if(desactivarArticulo){
        res.status(201).json({message:"Estado desactivado con exito"})
    } else {
        res.status(409).json({message:"Este artículo no pudo desactivar"});
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
