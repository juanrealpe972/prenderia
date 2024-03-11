import Cliente from '../models/jcrcClient.model.js'
import jwt from "jsonwebtoken"

export const validarClient = async (req, res) => {
    try {
        const {identificacion, password} = req.body
        const cliente = await Cliente.findOne({identificacion})
        
        if(cliente && cliente.password === password){
            let token = jwt.sing({cliente}, process.env.AUT_TOKEN_SECRET, {expiresIn: process.env.AUT_EXPPIRET})
            res.status(200).json({ "client": cliente, "token": token, mensaje: "Cliente validado"})
        }else {
            res.status(404).json({messaje: "Identificación o password incorrectos"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const validarToken = async (req, res, next) => {
    try {
        const {token} = req.headers["token"]
        if(!token) return res.status(403).send({mensaje:"No enviaste el Token"}); 
        jwt.verify(token, AUT_TOKEN_SECRET, async(err, decoded) => {
            if(err) return res.status(401).json({messaje: "token no autorizado"})
            const cliente = await Cliente.findById(decoded.id)
            if(!cliente) {
                res.status(401).json({messaje:"No autorizado"})
            }else {
                next()
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

