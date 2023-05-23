import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
import Food from '../models/food';
import { generateToken } from '../utils/JWT';

const createFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const food = new Food({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });

        const result = await food.save();

        return res.status(200).json({ food: result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const findAllFoods = async (req: Request, res: Response, next: NextFunction) => {
    const { page, status, name } = req.query;

    try {
        const result = await Food.aggregate([
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
                $facet: {
                    data: [{ $skip: (Number(page) - 1) * 10 }, { $limit: 10 }],
                    pagination: [{ $count: 'total' }]
                }
            }
        ]);

        return res.status(200).json({ data: result[0].data, pagination: result[0].pagination });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteFood = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Food.findByIdAndDelete(id)
        .then((food) => res.status(200).json({ food }))
        .catch((error) => res.status(500).json(error));
};

const findFoodById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Food.findById(id)
        .then((food) => res.status(200).json({ food }))
        .catch((error) => res.status(500).json({ error }));
};

const updateFood = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Food.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((food) => res.status(200).json({ food }))
        .catch((error) => res.status(500).json({ error }));
};

export { findAllFoods, createFood, findFoodById, updateFood, deleteFood };
