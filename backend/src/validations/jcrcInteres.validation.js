import { check } from "express-validator";

export const validarCreateDatosInteres = [
  check("meses", "Los meses de intereses son obligatorios")
    .not()
    .isEmpty()
    .isISO8601()
    .toDate(),
  check("fecha", "La fecha de los intereses en obligatoria")
    .not()
    .isISO8601()
    .toDate()
    .isEmpty(),
  check("valor", "El valor de los intereses en obligatorio")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true }),
  check("alquiler", "El alquiler del interes es obligatorio")
    .not()
    .isEmpty()
    .isNumeric(),
];

export const validarUpdateDatosInteres = [
  check("meses", "Los meses de intereses son obligatorios")
    .not()
    .isEmpty()
    .isISO8601()
    .toDate(),
  check("fecha", "La fecha de los intereses en obligatoria")
    .not()
    .isISO8601()
    .toDate()
    .isEmpty(),
  check("valor", "El valor de los intereses en obligatorio")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true }),
];
