import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Admin from '../models/admin';

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = new Admin({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });

        const result = await admin.save();

        return res.status(200).json({ admin: result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const deleteAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Admin.findByIdAndDelete(id)
        .then((admin) => res.status(200).json({ admin }))
        .catch((error) => res.status(500).json(error));
};

const findAdminById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Admin.findById(id)
        .then((admin) => res.status(200).json({ admin }))
        .catch((error) => res.status(500).json({ error }));
};
const updateAdmin = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Admin.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((admin) => res.status(200).json({ admin }))
        .catch((error) => res.status(500).json({ error }));
};

export { createAdmin, findAdminById, updateAdmin, deleteAdmin };
