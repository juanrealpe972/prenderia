import { Router } from "express";
import { createClient, deleteClient, getClient, getClients, updateClient } from "../controllers/jcrcClient.controllers.js";
import { validarClient } from "../controllers/jcrcAuthClient.controller.js";
import { validarDatesClient, validarDatosClient } from "../validations/jcrcClient.validation.js";

const routerClient = Router()

routerClient.get('/listarClient', getClients)
routerClient.get('/listarClient/:id', getClient)
routerClient.post('/registrarClient',validarDatosClient, createClient)
routerClient.put('/actualizarClient/:id', validarDatesClient, updateClient)
routerClient.delete('/eliminarClient/:id', deleteClient)
routerClient.post("/validar", validarClient)

export default routerClient