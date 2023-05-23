import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { BookDetailType, BookType } from '../interfaces';
import Area from '../models/area';
import Book from '../models/book';
import BookDetail from '../models/bookDetail';
import Table from '../models/table';
import { ENTITY_STATUS, ORDER_STATUS } from '../utils';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { book, bookDetails } = req.body;

        const bookDetailIds: any[] = [];
        const newBookDetails: any[] = [];

        bookDetails.forEach((item: BookDetailType) => {
            const _id = new mongoose.Types.ObjectId();
            bookDetailIds.push(_id);

            const newBookDetail = new BookDetail({
                ...item,
                _id
            });

            newBookDetails.push(newBookDetail);
        });

        await BookDetail.insertMany(newBookDetails, { ordered: true });

        const newBook = new Book({
            ...book,
            bookDetailIds
        });

        const result = await newBook.save();

        return res.status(200).json({ book: result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const findAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    const { page, status: queryStatus, isNotExpired, phone, isExpired, dateRange } = req.query;

    const status =
        queryStatus && typeof JSON.parse(`${queryStatus}`) === 'object'
            ? {
                  status: {
                      $in: JSON.parse(`${queryStatus}`)
                  }
              }
            : queryStatus
            ? {
                  status: JSON.parse(`${queryStatus}`)
              }
            : {};

    const now = new Date().getTime();

    const startAt = dateRange ? JSON.parse(`${dateRange}`).startAt : 0;
    const endAt = dateRange ? JSON.parse(`${dateRange}`).endAt : 0;

    try {
        const result = await Book.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' },
                    customerObjectId: { $toObjectId: '$customerId' },
                    checkoutDate: { $toLong: '$checkoutAt' },
                    bookingDate: { $toLong: '$createdAt' }
                }
            },
            {
                $addFields: {
                    expiredDate: {
                        $add: ['$checkoutDate', '$timeToUse']
                    }
                }
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customerObjectId',
                    foreignField: '_id',
                    as: 'customer'
                }
            },
            {
                $unwind: '$customer'
            },
            {
                $match: {
                    ...(queryStatus ? status : {}),
                    ...(isNotExpired
                        ? {
                              expiredDate: {
                                  $gte: now
                              }
                          }
                        : {}),
                    ...(isExpired
                        ? {
                              expiredDate: {
                                  $lt: now
                              }
                          }
                        : {}),
                    ...(phone
                        ? {
                              'customer.phone': {
                                  $regex: phone,
                                  $options: 'i'
                              }
                          }
                        : {}),
                    ...(dateRange
                        ? {
                              $and: [
                                  {
                                      bookingDate: {
                                          $gte: startAt
                                      }
                                  },
                                  {
                                      bookingDate: {
                                          $lte: endAt
                                      }
                                  }
                              ]
                          }
                        : {})
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $facet: {
                    data: [{ $skip: (Number(page) - 1) * 10 }, { $limit: 10 }],
                    pagination: [{ $count: 'total' }]
                }
            }
        ]);

        const books = (result[0]?.data || []).map((book: any) => {
            if (new Date(book.checkoutAt).getTime() + book.timeToUse < new Date().getTime() && book.status === ORDER_STATUS.NOT_USE)
                return {
                    ...book,
                    status: ORDER_STATUS.CANCELED
                };
            return book;
        });

        return res.status(200).json({ data: books, pagination: result[0]?.pagination });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json(error);
    }
};

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Book.findByIdAndDelete(id)
        .then((book) => res.status(200).json({ book }))
        .catch((error) => res.status(500).json(error));
};

const findBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const book = await Book.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' },
                    customerObjectId: { $toObjectId: '$customerId' }
                }
            },
            {
                $match: {
                    id
                }
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customerObjectId',
                    foreignField: '_id',
                    as: 'customer'
                }
            },
            {
                $unwind: '$customer'
            }
        ]);

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
                    id
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
                    id
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

        let data = book[0];

        if (data?.status === ORDER_STATUS.NOT_USE && Date.now() > new Date(data?.checkoutAt).getTime() + data?.timeToUse) {
            data = {
                ...data,
                status: ORDER_STATUS.CANCELED
            };
        }

        return res.status(200).json({ book: data, foods, tables });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Book.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((book) => res.status(200).json({ book }))
        .catch((error) => res.status(500).json({ error }));
};

const findFoodsAndTablesByBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;

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

        return res.status(200).json({ foods, tables });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const updateFoodInBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId, newProducts, totalPrice } = req.body;

        const book: BookType | any = await Book.findById(bookId).lean();

        const { bookDetailIds: oldBookDetailIds } = book;

        const bookDetailIds: any[] = [...oldBookDetailIds];
        const newBookDetails: any[] = [];

        newProducts.forEach((item: BookDetailType) => {
            const _id = new mongoose.Types.ObjectId();

            bookDetailIds.push(_id);

            const newBookDetail = new BookDetail({
                ...item,
                _id
            });

            newBookDetails.push(newBookDetail);
        });

        await BookDetail.insertMany(newBookDetails, { ordered: true });

        const newBook: BookType = {
            ...book,
            totalPrice,
            bookDetailIds
        };

        await Book.updateOne({ _id: bookId }, { ...newBook });

        return res.status(200).json({ book: newBook });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ error });
    }
};

const findTablesForBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { checkoutAt, timeToUse } = req.body;

        const areas = await Area.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' }
                }
            },
            {
                $match: {
                    status: ENTITY_STATUS.ACTIVATED
                }
            },
            {
                $lookup: {
                    from: 'tables',
                    localField: 'id',
                    foreignField: 'areaId',
                    as: 'tables'
                }
            }
        ]);

        const books = await Book.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' },
                    checkoutDate: { $toLong: '$checkoutAt' }
                }
            },
            {
                $addFields: {
                    totalTime: {
                        $add: ['$checkoutDate', '$timeToUse']
                    }
                }
            },
            {
                $match: {
                    status: {
                        $in: [ORDER_STATUS.NOT_USE, ORDER_STATUS.USING]
                    }
                }
            }
        ]);

        const checkoutDate = new Date(checkoutAt).getTime();
        const totalTime = checkoutDate + timeToUse;
        const result: any[] = [];

        books.forEach((book: any) => {
            if ((totalTime >= book.checkoutDate && totalTime <= book.totalTime) || (checkoutDate >= book.checkoutDate && checkoutDate <= book.totalTime)) result.push(book);
        });

        return res.status(200).json({ areas, books: result });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ error });
    }
};

const findAllBooksForOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { status: queryStatus, table } = req.query;
    const status =
        queryStatus && typeof JSON.parse(`${queryStatus}`) === 'object'
            ? {
                  status: {
                      $in: JSON.parse(`${queryStatus}`)
                  }
              }
            : queryStatus
            ? {
                  status: JSON.parse(`${queryStatus}`)
              }
            : {};

    try {
        let result = [];
        if (table) {
            result = await Book.aggregate([
                {
                    $addFields: {
                        id: { $toString: '$_id' },
                        customerObjectId: { $toObjectId: '$customerId' },
                        checkoutDate: { $toLong: '$checkoutAt' },
                        bookingDate: { $toLong: '$createdAt' }
                    }
                },
                {
                    $addFields: {
                        expiredDate: {
                            $add: ['$checkoutDate', '$timeToUse']
                        }
                    }
                },
                {
                    $match: {
                        ...(queryStatus ? status : {})
                    }
                },
                {
                    $lookup: {
                        from: 'customers',
                        localField: 'customerObjectId',
                        foreignField: '_id',
                        as: 'customer'
                    }
                },
                {
                    $unwind: '$customer'
                },
                {
                    $unwind: '$tables'
                },
                {
                    $addFields: {
                        tableObjectId: { $toObjectId: '$tables.id' }
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
                    $match: {
                        ...(table
                            ? {
                                  'table.name': {
                                      $regex: table,
                                      $options: 'i'
                                  }
                              }
                            : {})
                    }
                },
                // {
                //     $setWindowFields: {
                //         partitionBy: '$_id',
                //         sortBy: { bookingDate: -1 },
                //         output: {
                //             quantitiesForState: {
                //                 $push: '$table'
                //             }
                //         }
                //     }
                // },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $facet: {
                        data: [{ $skip: 0 }, { $limit: 10000 }],
                        pagination: [{ $count: 'total' }]
                    }
                }
            ]);
        } else {
            result = await Book.aggregate([
                {
                    $addFields: {
                        id: { $toString: '$_id' },
                        customerObjectId: { $toObjectId: '$customerId' },
                        checkoutDate: { $toLong: '$checkoutAt' },
                        bookingDate: { $toLong: '$createdAt' }
                    }
                },
                {
                    $addFields: {
                        expiredDate: {
                            $add: ['$checkoutDate', '$timeToUse']
                        }
                    }
                },
                {
                    $match: {
                        ...(queryStatus ? status : {})
                    }
                },
                {
                    $lookup: {
                        from: 'customers',
                        localField: 'customerObjectId',
                        foreignField: '_id',
                        as: 'customer'
                    }
                },
                {
                    $unwind: '$customer'
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $facet: {
                        data: [{ $skip: 0 }, { $limit: 10000 }],
                        pagination: [{ $count: 'total' }]
                    }
                }
            ]);
        }

        return res.status(200).json({ data: result[0]?.data || [], pagination: result[0]?.pagination });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json(error);
    }
};

export { findAllBooks, createBook, findBookById, updateBook, deleteBook, findFoodsAndTablesByBook, updateFoodInBook, findTablesForBook, findAllBooksForOrder };
