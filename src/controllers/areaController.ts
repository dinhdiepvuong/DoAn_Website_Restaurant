import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
import Area from '../models/area';
import { generateToken } from '../utils/JWT';

const createArea = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const area = new Area({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });

        const result = await area.save();

        return res.status(200).json({ area: result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const findAllAreas = async (req: Request, res: Response, next: NextFunction) => {
    const { page, status, name } = req.query;

    try {
        const result = await Area.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' }
                }
            },
            {
                $match: {
                    ...(status ? { status: Number(status) } : {}),
                    ...(name
                        ? {
                              name: {
                                  $regex: name,
                                  $options: 'i'
                              }
                          }
                        : {})
                }
            },
            {
                $lookup: {
                    from: 'tables',
                    localField: 'id',
                    foreignField: 'areaId',
                    as: 'tables'
                }
            },
            {
                $facet: {
                    data: [{ $skip: page ? (Number(page) - 1) * 10 : 0 }, { $limit: page ? 10 : 9999 }],
                    pagination: [{ $count: 'total' }]
                }
            }
        ]);

        return res.status(200).json({ data: result[0].data, pagination: result[0].pagination });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteArea = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Area.findByIdAndDelete(id)
        .then((area) => res.status(200).json({ area }))
        .catch((error) => res.status(500).json(error));
};

const findAreaById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Area.findById(id)
        .then((area) => res.status(200).json({ area }))
        .catch((error) => res.status(500).json({ error }));
};
const updateArea = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Area.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((area) => res.status(200).json({ area }))
        .catch((error) => res.status(500).json({ error }));
};

export { findAllAreas, createArea, findAreaById, updateArea, deleteArea };
