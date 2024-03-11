import {Router} from "express"
import { alquileresPagados, createAlquiler, deleteAlquiler, getAlquiler, getAlquilers, interesPendiente, updateAlquiler } from "../controllers/jcrcAlquiler.controller.js"

const routerAlquiler = Router()  

routerAlquiler.get("/listarAlquiler", getAlquilers)
routerAlquiler.get("/listarAlquiler/:id", getAlquiler)
routerAlquiler.post("/registrarAlquiler", createAlquiler)
routerAlquiler.put("/actualizarAlquiler/:id", updateAlquiler)
routerAlquiler.delete("/eliminarAlquiler/:id", deleteAlquiler)
routerAlquiler.post("/alquilerPagados/:id", alquileresPagados)
routerAlquiler.get("/interesPendiente", interesPendiente)

export default routerAlquiler