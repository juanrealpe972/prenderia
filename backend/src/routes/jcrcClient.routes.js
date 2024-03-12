import { Router } from "express";
import { createClient, deleteClient, getClient, getClients, updateClient } from "../controllers/jcrcClient.controllers.js";
import { validarCliente } from "../controllers/jcrcAuthClient.controller.js";
import { validarCreateDatosClient, validarUpdateDatesClient } from "../validations/jcrcClient.validation.js";

const routerClient = Router()

routerClient.get('/listarClient', getClients)
routerClient.get('/listarClient/:id', getClient)
routerClient.post('/registrarClient',validarCreateDatosClient, createClient)
routerClient.put('/actualizarClient/:id', validarUpdateDatesClient, updateClient)
routerClient.delete('/eliminarClient/:id', deleteClient)
routerClient.post("/validar", validarCliente)

export default routerClient