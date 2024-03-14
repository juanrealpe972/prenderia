import { Router } from "express";
import { createInteres, deleteInteres, getInteres, getIntereses, totalInteres, updateInteres } from "../controllers/jcrcInteres.controller.js";
import { validarToken } from "../controllers/jcrcAuthClient.controller.js";
import { validarCreateDatosInteres, validarUpdateDatosInteres } from "../validations/jcrcInteres.validation.js";

const routerInteres = Router()

routerInteres.get("/listarInteres", validarToken, getIntereses)
routerInteres.get("/listarInteres/:id", validarToken, getInteres)
routerInteres.post("/RegistrarInteres", validarToken, validarCreateDatosInteres, createInteres)
routerInteres.put("/actualizarInteres/:id", validarToken, validarUpdateDatosInteres, updateInteres)
routerInteres.delete("/eliminarInteres/:id", validarToken, deleteInteres)
routerInteres.get("/totalinteres", validarToken, totalInteres)

export default routerInteres