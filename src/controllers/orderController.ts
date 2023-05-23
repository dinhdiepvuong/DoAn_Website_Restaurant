import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Book from '../models/book';
import Order from '../models/order';
import { ORDER_STATUS } from '../utils';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.body;

        const book = await Book.findById(bookId).lean();

        await Book.findByIdAndUpdate(book?._id, { ...book, status: ORDER_STATUS.USED }, { returnOriginal: false });

        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });

        const result = await order.save();

        return res.status(200).json({ order: result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const findAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    const { page, status, phone } = req.query;

    try {
        const result = await Order.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' },
                    bookObjectId: {
                        $toObjectId: '$bookId'
                    }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'bookObjectId',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind: '$book'
            },
            {
                $addFields: {
                    customerObjectId: {
                        $toObjectId: '$book.customerId'
                    }
                }
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customerObjectId',
                    foreignField: '_id',
                    as: 'book.customer'
                }
            },
            {
                $unwind: '$book.customer'
            },
            {
                $match: {
                    ...(phone
                        ? {
                              'book.customer.phone': {
                                  $regex: phone,
                                  $options: 'i'
                              }
                          }
                        : {})
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

const deleteOrder = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Order.findByIdAndDelete(id)
        .then((order) => res.status(200).json({ order }))
        .catch((error) => res.status(500).json(error));
};

const findOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const order = await Order.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' },
                    bookObjectId: { $toObjectId: '$bookId' }
                }
            },
            {
                $match: {
                    id
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'bookObjectId',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind: '$book'
            },
            {
                $addFields: {
                    customerObjectId: { $toObjectId: '$book.customerId' }
                }
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customerObjectId',
                    foreignField: '_id',
                    as: 'book.customer'
                }
            },
            {
                $unwind: '$book.customer'
            }
        ]);

        const { bookId } = order[0];

        const books1 = await Book.aggregate([
            {
                $addFields: {
                    id: {
                        $toString: '$_id'
                    }
                }
            },
            {
                $match: {
                    id: bookId
                }
            },
            {
                $unwind: '$bookDetailIds'
            },
            {
                $addFields: {
                    bookDetailObjectId: {
                        $toObjectId: '$bookDetailIds'
                    }
                }
            },
            {
                $lookup: {
                    from: 'bookDetails',
                    localField: 'bookDetailObjectId',
                    foreignField: '_id',
                    as: 'bookDetail'
                }
            },
            {
                $unwind: '$bookDetail'
            },
            {
                $addFields: {
                    productObjectId: {
                        $toObjectId: '$bookDetail.productId'
                    }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productObjectId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            }
        ]);

        const books2 = await Book.aggregate([
            {
                $addFields: {
                    id: {
                        $toString: '$_id'
                    }
                }
            },
            {
                $match: {
                    id: bookId
                }
            },
            {
                $unwind: '$tables'
            },
            {
                $addFields: {
                    tableObjectId: {
                        $toObjectId: '$tables.id'
                    }
                }
            },
            {
                $lookup: {
                    from: 'tables',
                    localField: 'tableObjectId',
                    foreignField: '_id',
                    as: 'table'
                }
            },
            {
                $unwind: '$table'
            },
            {
                $addFields: {
                    areaObjectId: {
                        $toObjectId: '$table.areaId'
                    }
                }
            },
            {
                $lookup: {
                    from: 'areas',
                    localField: 'areaObjectId',
                    foreignField: '_id',
                    as: 'table.area'
                }
            },
            {
                $unwind: '$table.area'
            }
        ]);

        const foods = books1.map((book) => {
            return {
                id: book?.bookDetailIds,
                product: {
                    ...book?.product,
                    id: book?.product?._id
                },
                quantity: book?.bookDetail?.quantity,
                note: book?.bookDetail?.note,
                status: book?.bookDetail?.status || 0
            };
        });

        const tables = books2.map((book) => {
            return {
                table: {
                    ...book?.table,
                    id: book?.table?._id
                },
                quantity: book?.tables?.quantity,
                note: book?.tables?.note
            };
        });

        return res.status(200).json({ order: order[0], foods, tables });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const updateOrder = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Order.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((order) => res.status(200).json({ order }))
        .catch((error) => res.status(500).json({ error }));
};

export { findAllOrders, createOrder, findOrderById, updateOrder, deleteOrder };
