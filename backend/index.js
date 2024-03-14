import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { conectDBMongo } from './src/database/jcrcdatabase.js'
import routerClient from './src/routes/jcrcClient.routes.js'
import routerInteres from './src/routes/jcrcInteres.routes.js'
import routerAlquiler from './src/routes/jcrcAlquiler.routes.js'
import routerArticulo from './src/routes/jcrcArticulo.routes.js'

const PORT = 972
const app = express()

conectDBMongo()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
    
app.set("view engine", "ejs")
app.set("views", "./view")

app.get("/documents", (req, res) => {
    res.render("jcrcDocuments.ejs")
})
app.use(express.static("./public"))

app.use("/user", routerClient)
app.use("/interes", routerInteres)
app.use("/alquiler", routerAlquiler)
app.use("/articulo", routerArticulo)

app.listen(PORT, () => {
    console.log(`Conectado en puerto: ${PORT}`);
})