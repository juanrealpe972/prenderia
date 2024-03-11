import { Router } from "express";
import { createInteres, deleteInteres, getInteres, getIntereses, totalInteres, updateInteres } from "../controllers/jcrcInteres.controller.js";

const routerInteres = Router()

routerInteres.get("/listarInteres", getIntereses)
routerInteres.get("/listarInteres/:id", getInteres)
routerInteres.post("/RegistrarInteres", createInteres)
routerInteres.put("/actualizarInteres/:id", updateInteres)
routerInteres.delete("/eliminarInteres/:id", deleteInteres)
routerInteres.get("/totalinteres", totalInteres)

export default routerInteres