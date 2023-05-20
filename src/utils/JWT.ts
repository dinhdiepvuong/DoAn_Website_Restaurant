import logging from "../config/logging";

const jwt = require('jsonwebtoken')

const generateToken = async (user: any, secretSignature: any, tokenLife: any) => {
    try {
        const token = await jwt.sign(
            { data: user },
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            }
        )
        return token;
    } catch (error) {
        console.log(error)
    }
}
const verifyToken = (token: any, secretKey: any) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error: any, decoded: any) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
}
export {
    generateToken,
    verifyToken
}