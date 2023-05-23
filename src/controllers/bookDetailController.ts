import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
import BookDetail from '../models/bookDetail';
import { generateToken } from '../utils/JWT';

const createBookDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookDetail = new BookDetail({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });

        const result = await bookDetail.save();

        return res.status(200).json({ bookDetail: result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const findAllBookDetails = async (req: Request, res: Response, next: NextFunction) => {
    const { page } = req.query;

    try {
        const result = await BookDetail.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' }
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

const deleteBookDetail = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return BookDetail.findByIdAndDelete(id)
        .then((bookDetail) => res.status(200).json({ bookDetail }))
        .catch((error) => res.status(500).json(error));
};

const findBookDetailById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return BookDetail.findById(id)
        .then((bookDetail) => res.status(200).json({ bookDetail }))
        .catch((error) => res.status(500).json({ error }));
};
const updateBookDetail = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return BookDetail.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((bookDetail) => res.status(200).json({ bookDetail }))
        .catch((error) => res.status(500).json({ error }));
};

export { findAllBookDetails, createBookDetail, findBookDetailById, updateBookDetail, deleteBookDetail };
