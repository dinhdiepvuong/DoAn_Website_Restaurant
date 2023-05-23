import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
import Drink from '../models/drink';
import { generateToken } from '../utils/JWT';

const createDrink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const drink = new Drink({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });

        const result = await drink.save();

        return res.status(200).json({ drink: result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const findAllDrinks = async (req: Request, res: Response, next: NextFunction) => {
    const { page, name } = req.query;

    try {
        const result = await Drink.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' }
                }
            },
            {
                $match: {
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

const deleteDrink = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Drink.findByIdAndDelete(id)
        .then((drink) => res.status(200).json({ drink }))
        .catch((error) => res.status(500).json(error));
};

const findDrinkById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Drink.findById(id)
        .then((drink) => res.status(200).json({ drink }))
        .catch((error) => res.status(500).json({ error }));
};
const updateDrink = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Drink.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((drink) => res.status(200).json({ drink }))
        .catch((error) => res.status(500).json({ error }));
};

export { findAllDrinks, createDrink, findDrinkById, updateDrink, deleteDrink };
