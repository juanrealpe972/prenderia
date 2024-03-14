import { check } from "express-validator";

export const validarCreateDatosArticulos = [
  check("nombre", "EL nombre del articulo es obligatorio, max 50 caracteres")
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 50 }),
  check("tipo", "El tipo de articulo es obligatorio")
    .not()
    .isEmpty()
    .custom((value) => {
      const tipo = ["Vehiculo", "Oro", "Electrodomestico", "Maquina", "Herramienta"];
      if (!tipo.includes(value)) {
        throw new Error("Tipo invalido");
      }
      return true;
    }),
  check("estado")
    .not()
    .isEmpty()
    .custom((value) => {
      const estado = ["activo", "desactivado"];
      if (!estado.includes(value)) {
        throw new Error("Tipo invalido");
      }
      return true;
    }),
];

export const validarUpdateDatosArticulos = [
  check("nombre", "EL nombre del articulo es obligatorio, max 50 caracteres")
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 50 }),
  check("tipo", "El tipo de articulo es obligatorio")
    .not()
    .isEmpty()
    .custom((value) => {
      const tipo = ["Vehiculo", "Oro", "Electrodomestico", "Maquina", "Herramienta"];
      if (!tipo.includes(value)) {
        throw new Error("Tipo invalido");
      }
      return true;
    }),
  check("estado")
    .not()
    .isEmpty()
    .custom((value) => {
      const estado = ["activo", "desactivado"];
      if (!estado.includes(value)) {
        throw new Error("Tipo invalido");
      }
      return true;
    }),
];
