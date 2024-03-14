import jwt from "jsonwebtoken";
import { AUT_TOKEN_SECRET } from "../../config.js";

export async function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, AUT_TOKEN_SECRET, { expiresIn: "12h" }, (err, token) => {
            if (err) reject(err)
            resolve(token)
        });
    });
}
