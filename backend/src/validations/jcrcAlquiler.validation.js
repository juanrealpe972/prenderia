import { check } from "express-validator";

export const validarCreateDatosAlquiler = [
  check("valor", "El valor del Alquiler es obligatorio")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true }),
  check("fecha", "La fecha del alquiler es obligatoria")
    .not()
    .isEmpty()
    .isISO8601()
    .toDate(),
  check("meses", "Los meses del interes son obligatorias")
    .not()
    .isEmpty(),
  check("descripcion", "La descripcion del alquiler es obligatoria")
    .not()
    .isEmpty(),
  check("interes", "El interes del alquiler es obligatorio")
    .not()
    .toInt()
    .isEmpty(),
  check("cliente", "El cliente del interes es obligatorio").not().isEmpty(),
  check("articulo", "El articulo del interes es obligatorio").not().isEmpty(),
];

export const validarUpdateDatosAlquiler = [
  check("valor", "El valor del Alquiler es obligatorio")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true }),
  check("fecha", "La fecha del alquiler es obligatoria")
    .not()
    .isEmpty()
    .isISO8601()
    .toDate(),
  check("meses", "Los meses del interes son obligatorias")
    .not()
    .isEmpty()
    .isNumeric(),
  check("descripcion", "La descripcion del alquiler es obligatoria")
    .not()
    .isEmpty(),
  check("interes", "Los intereses del alquiler son obligatorios")
    .not()
    .isEmpty()
    .toInt()
    .isNumeric({ no_symbols: true })
];
