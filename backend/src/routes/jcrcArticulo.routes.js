import { Router } from "express";
import { activarArticuloStado, createArticulo, desactivarArticuloStado, getArticulo, getArticulos, updateArticulo } from "../controllers/jcrcArticulo.controller.js";

const routerArticulo = Router()

routerArticulo.get("/listarArticulo", getArticulos)
routerArticulo.get("/listarArticulo/:id", getArticulo)
routerArticulo.post("/registrarArticulo", createArticulo)
routerArticulo.put("/actualizarArticulo/:id", updateArticulo)
routerArticulo.put("/activarArticulo/:id", activarArticuloStado)
routerArticulo.put("/desactivarArticulo/:id", desactivarArticuloStado)

export default routerArticulo