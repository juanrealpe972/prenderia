import {Router} from "express"
import { alquileresPagados, createAlquiler, deleteAlquiler, getAlquiler, getAlquilers, interesPendiente, updateAlquiler } from "../controllers/jcrcAlquiler.controller.js"
import { validarToken } from "../controllers/jcrcAuthClient.controller.js"
import { validarCreateDatosAlquiler, validarUpdateDatosAlquiler } from "../validations/jcrcAlquiler.validation.js"

const routerAlquiler = Router()  

routerAlquiler.get("/listarAlquiler", validarToken, getAlquilers)
routerAlquiler.get("/listarAlquiler/:id", validarToken, getAlquiler)
routerAlquiler.post("/registrarAlquiler", validarToken, validarCreateDatosAlquiler, createAlquiler)
routerAlquiler.put("/actualizarAlquiler/:id", validarToken, validarUpdateDatosAlquiler, updateAlquiler)
routerAlquiler.delete("/eliminarAlquiler/:id",validarToken, deleteAlquiler)
routerAlquiler.get("/alquilerPagados/:id", validarToken, alquileresPagados)
routerAlquiler.get("/interesPendiente", validarToken, interesPendiente)

export default routerAlquiler