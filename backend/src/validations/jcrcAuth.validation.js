import { check } from "express-validator";

export const validarValidateAuth = [
  check("identificacion", "La identificación es obligatoria").not().isEmpty(),
  check("password", "El password es obligatorio").not().isEmpty(),
];

