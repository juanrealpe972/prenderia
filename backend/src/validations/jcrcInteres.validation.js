import { check } from "express-validator";

export const validarCreateDatosInteres = [
  check("meses", "Los meses de intereses son obligatorios").not().isEmpty(),
  check("fecha", "La fecha de los intereses en obligatoria")
    .not()
    .isEmpty()
    .isISO8601()
    .toDate(),
  check("valor", "El valor de los intereses en obligatorio")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true }),
  check("alquiler", "El alquiler del interes es obligatorio").not().isEmpty(),
  check("estado", "El estado del interes es obligatorio")
    .custom((value) => {
      const estado = ["pagado", "sin pagar"];
      if (!estado.includes(value)) {
        throw new Error("Estado inválido");
      }
      return true;
    })
    .not()
    .isEmpty(),
];

export const validarUpdateDatosInteres = [
  check("meses", "Los meses de intereses son obligatorios")
    .not()
    .isEmpty(),
  check("fecha", "La fecha de los intereses en obligatoria")
    .not()
    .isEmpty()
    .toDate()
    .isISO8601(),
  check("valor", "El valor de los intereses en obligatorio")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true }),
  check( "estado", "El estado del interes es obligatorio")
    .custom((value) => {
      const estado = ["pagado", "sin pagar"];
      if (!estado.includes(value)) {
        throw new Error("Estado inválido");
      }
      return true
    })
    .not()
    .isEmpty(),
];
