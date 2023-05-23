import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Admin from '../models/admin';

const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
        const result = await Admin.aggregate([
            {
                $match: {
                    username,
                    password
                }
            },
            {
                $addFields: {
                    id: '$_id'
                }
            }
        ]);

        return res.status(200).json({ admin: result[0] });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export { loginAdmin };
