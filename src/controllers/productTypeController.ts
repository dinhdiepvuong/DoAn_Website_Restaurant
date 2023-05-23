import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
import ProductType from '../models/productType';

const createProductType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productType = new ProductType({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });

        const result = await productType.save();

        return res.status(200).json({ productType: result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const findAllProductTypes = async (req: Request, res: Response, next: NextFunction) => {
    const { page, status, type, name } = req.query;

    try {
        const result = await ProductType.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' }
                }
            },
            {
                $match: {
                    ...(status ? { status: Number(status) } : {}),
                    ...(type ? { type: Number(type) } : {}),
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
                    from: 'products',
                    localField: 'id',
                    foreignField: 'productTypeId',
                    as: 'products'
                }
            },
            {
                $project: {
                    id: 1,
                    name: 1,
                    avatar: 1,
                    status: 1,
                    type: 1,
                    quantityProduct: {
                        $size: '$products'
                    }
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

const deleteProductType = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return ProductType.findByIdAndDelete(id)
        .then((productType) => res.status(200).json({ productType }))
        .catch((error) => res.status(500).json(error));
};

const findProductTypeById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return ProductType.findById(id)
        .then((productType) => res.status(200).json({ productType }))
        .catch((error) => res.status(500).json({ error }));
};

const updateProductType = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return ProductType.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((productType) => res.status(200).json({ productType }))
        .catch((error) => res.status(500).json({ error }));
};

export { findAllProductTypes, createProductType, findProductTypeById, updateProductType, deleteProductType };
