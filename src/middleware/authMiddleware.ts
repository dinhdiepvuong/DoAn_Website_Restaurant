import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/JWT';
// import User from '../models/user'
// import Role from '../models/role';

// export const isAuth = async (req: any, res: Response, next: NextFunction) => {
//     const token = req.headers["x-access-token"];
//     if (token) {
//         try {
//             const decoded = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
//             req.decode = decoded;
//             next();
//         } catch (error) {
//             return res.status(401).json({
//                 message: 'Unauthorized.',
//             });
//         }
//     } else {
//         return res.status(403).send({
//             message: 'No token provided.',
//         });
//     }
// };

export const authorize = (roles: any[] = []) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (roles.length === 0) {
            next();
            return;
        }
        const token = req.headers['x-access-token'];
        if (token) {
            try {
                const decoded: any = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
                if (roles.includes(decoded.data.role.name)) {
                    next();
                } else {
                    return res.status(401).json({
                        message: 'Unauthorized.'
                    });
                }
            } catch (error) {
                return res.status(401).json({
                    message: 'Unauthorized.'
                });
            }
        } else {
            return res.status(403).json({
                message: 'No token provided.'
            });
        }
    };
};
