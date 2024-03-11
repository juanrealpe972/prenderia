import { check } from "express-validator";

export const validarDatosClient = [
  check("identificacion", "La identificación es obligatoria, max 11 caracteres")
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 11 }),
  check("nombres", "El nombre es obligatorio, max 50 caracteres")
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 50 }),
  check("direccion", "La dirección es obligatoria, max 50 caracteres")
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 50 }),
  check("telefono", "El telefono es obligatorio, max 10 caracteres")
    .not()
    .isEmpty()
    .isInt({ min: 1 })
    .toInt()
    .isNumeric({ no_symbols: true })
    .isLength({ max: 10 }),
  check("fecha_nac", "La fecha de nacimiento es obligatoria")
    .exists()
    .isISO8601()
    .toDate(),
  check("password", "El password es obligatorio, min 6 caracteres")
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
];

export const validarDatesClient = [
    check("nombres", "El nombre es obligatorio, max 50 caracteres")
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 50 }),
    check("direccion", "La dirección es obligatoria, max 50 caracteres")
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 50 }),
    check("telefono", "El telefono es obligatorio, max 10 caracteres")
      .not()
      .isEmpty()
      .isInt({ min: 1 })
      .toInt()
      .isNumeric({ no_symbols: true })
      .isLength({ max: 10 }),
    check("fecha_nac", "La fecha de nacimiento es obligatoria")
      .exists()
      .isISO8601()
      .toDate(),
    check("password", "El password es obligatorio, min 6 caracteres")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
  ];