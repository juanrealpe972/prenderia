import { Router } from "express";
import { activarArticuloStado, createArticulo, desactivarArticuloStado, getArticulo, getArticulos, updateArticulo } from "../controllers/jcrcArticulo.controller.js";
import { validarToken } from "../controllers/jcrcAuthClient.controller.js";
import { validarCreateDatosArticulos, validarUpdateDatosArticulos } from "../validations/jcrcArticulo.validation.js";

const routerArticulo = Router()

routerArticulo.get("/listarArticulo", validarToken, getArticulos)
routerArticulo.get("/listarArticulo/:id", validarToken, getArticulo)
routerArticulo.post("/registrarArticulo", validarToken, validarCreateDatosArticulos, createArticulo)
routerArticulo.put("/actualizarArticulo/:id", validarToken, validarUpdateDatosArticulos, updateArticulo)
routerArticulo.put("/activarArticulo/:id", validarToken, activarArticuloStado)
routerArticulo.put("/desactivarArticulo/:id", validarToken, desactivarArticuloStado)

export default routerArticulo