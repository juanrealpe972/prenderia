import { Router } from "express";
import { createClient, deleteClient, getClient, getClients, updateClient } from "../controllers/jcrcClient.controllers.js";
import { validarCliente, validarToken } from "../controllers/jcrcAuthClient.controller.js";
import { validarCreateDatosClient, validarUpdateDatesClient } from "../validations/jcrcClient.validation.js";
import { validarValidateAuth } from "../validations/jcrcAuth.validation.js";

const routerClient = Router()

routerClient.get('/listarClient', validarToken, getClients)
routerClient.get('/listarClient/:id', validarToken, getClient)
routerClient.post('/registrarClient',validarCreateDatosClient, createClient)
routerClient.put('/actualizarClient/:id', validarToken, validarUpdateDatesClient, updateClient)
routerClient.delete('/eliminarClient/:id',validarToken, deleteClient)
routerClient.post("/validar", validarValidateAuth, validarCliente)

export default routerClient