import mongoose from "mongoose";

export const conectDBMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost/prenderiamongo')
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(error);
    }
}