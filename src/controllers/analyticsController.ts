import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import Book from '../models/book';
import Customer from '../models/customer';
import Order from '../models/order';
import { getDate, getDayOfWeek, getRangeMonth, getRangeWeek } from '../utils';

const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const totalCustomer = await Customer.count();

        const now = new Date();

        const startDateNow = moment(now).startOf('date').toISOString();
        const endDateNow = moment(now).endOf('date').toISOString();

        const totalRevenueToday = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDateNow),
                        $lte: new Date(endDateNow)
                    }
                }
            },
            {
                $addFields: {
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
                $project: {
                    book: 1
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: '$book.totalPrice'
                    }
                }
            }
        ]);

        const Last30Day = moment(now).subtract(30, 'days').toISOString();

        const totalRevenue30Day = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(Last30Day),
                        $lte: now
                    }
                }
            },
            {
                $addFields: {
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
                $project: {
                    book: 1
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: '$book.totalPrice'
                    }
                }
            }
        ]);

        const totalBook30Day = await Book.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(Last30Day),
                        $lte: now
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: 1
                    }
                }
            }
        ]);

        const newBooks = await Book.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' },
                    customerObjectId: { $toObjectId: '$customerId' }
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
                $limit: 5
            }
        ]);

        const top10Customer = await Book.aggregate([
            {
                $group: {
                    _id: '$customerId',
                    customerId: {
                        $first: '$customerId'
                    },
                    total: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    total: -1
                }
            },
            {
                $addFields: {
                    id: { $toString: '$_id' },
                    customerObjectId: { $toObjectId: '$customerId' }
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

        // const monday = getDayOfWeek(now, 1);
        // const tuesday = getDayOfWeek(now, 2);
        // const wednesday = getDayOfWeek(now, 3);
        // const thursday = getDayOfWeek(now, 4);
        // const friday = getDayOfWeek(now, 5);
        // const saturday = getDayOfWeek(now, 6);
        // const sunday = getDayOfWeek(now, 7);

        // const getAreaChartRevenue = await Order.aggregate([
        //     {
        //         $addFields: {
        //             value: {
        //                 $switch: {
        //                     branches: [
        //                         {
        //                             case: {
        //                                 $and: [
        //                                     {
        //                                         $gte: ['$createdAt', monday.start]
        //                                     },
        //                                     {
        //                                         $lte: ['$createdAt', monday.end]
        //                                     }
        //                                 ]
        //                             },
        //                             then: monday.name
        //                         },
        //                         {
        //                             case: {
        //                                 $and: [
        //                                     {
        //                                         $gte: ['$createdAt', tuesday.start]
        //                                     },
        //                                     {
        //                                         $lte: ['$createdAt', tuesday.end]
        //                                     }
        //                                 ]
        //                             },
        //                             then: tuesday.name
        //                         },
        //                         {
        //                             case: {
        //                                 $and: [
        //                                     {
        //                                         $gte: ['$createdAt', wednesday.start]
        //                                     },
        //                                     {
        //                                         $lte: ['$createdAt', wednesday.end]
        //                                     }
        //                                 ]
        //                             },
        //                             then: wednesday.name
        //                         },
        //                         {
        //                             case: {
        //                                 $and: [
        //                                     {
        //                                         $gte: ['$createdAt', thursday.start]
        //                                     },
        //                                     {
        //                                         $lte: ['$createdAt', thursday.end]
        //                                     }
        //                                 ]
        //                             },
        //                             then: thursday.name
        //                         },
        //                         {
        //                             case: {
        //                                 $and: [
        //                                     {
        //                                         $gte: ['$createdAt', friday.start]
        //                                     },
        //                                     {
        //                                         $lte: ['$createdAt', friday.end]
        //                                     }
        //                                 ]
        //                             },
        //                             then: friday.name
        //                         },
        //                         {
        //                             case: {
        //                                 $and: [
        //                                     {
        //                                         $gte: ['$createdAt', saturday.start]
        //                                     },
        //                                     {
        //                                         $lte: ['$createdAt', saturday.end]
        //                                     }
        //                                 ]
        //                             },
        //                             then: saturday.name
        //                         },
        //                         {
        //                             case: {
        //                                 $and: [
        //                                     {
        //                                         $gte: ['$createdAt', sunday.start]
        //                                     },
        //                                     {
        //                                         $lte: ['$createdAt', sunday.end]
        //                                     }
        //                                 ]
        //                             },
        //                             then: sunday.name
        //                         }
        //                     ],
        //                     default: 'no'
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $match: {
        //             value: {
        //                 $ne: 'no'
        //             }
        //         }
        //     },
        //     {
        //         $addFields: {
        //             bookObjectId: {
        //                 $toObjectId: '$bookId'
        //             }
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'books',
        //             localField: 'bookObjectId',
        //             foreignField: '_id',
        //             as: 'book'
        //         }
        //     },
        //     {
        //         $unwind: '$book'
        //     },
        //     {
        //         $group: {
        //             _id: '$value',
        //             total: {
        //                 $sum: '$book.totalPrice'
        //             }
        //         }
        //     }
        // ]);

        // const areaChartRevenueName = [monday.name, tuesday.name, wednesday.name, thursday.name, friday.name, saturday.name, sunday.name];
        // const areaChartRevenueValue = [];
        // for (let i = 0; i < 7; i++) {
        //     const temp = getAreaChartRevenue.find((item: any) => item._id === areaChartRevenueName[i]);

        //     areaChartRevenueValue.push(temp ? temp?.total : 0);
        // }

        return res.status(200).json({
            totalCustomer,
            totalRevenueToday: totalRevenueToday[0]?.total,
            totalRevenue30Day: totalRevenue30Day[0]?.total,
            totalBook30Day: totalBook30Day[0]?.total,
            newBooks,
            top10Customer
            // areaChartRevenue: {
            //     name: areaChartRevenueName,
            //     value: areaChartRevenueValue
            // }
        });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ error });
    }
};

const getRevenueByTime = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type, time } = req.body;

        const date = new Date(time);

        let areaChartRevenueName: any[] = [];
        let areaChartRevenueValue: any[] = [];

        if (type === 'date') {
            const current = getDate(date);

            const getAreaChartRevenue = await Order.aggregate([
                {
                    $addFields: {
                        value: {
                            $switch: {
                                branches: [
                                    {
                                        case: {
                                            $and: [
                                                {
                                                    $gte: ['$createdAt', current.start]
                                                },
                                                {
                                                    $lte: ['$createdAt', current.end]
                                                }
                                            ]
                                        },
                                        then: current.name
                                    }
                                ],
                                default: 'no'
                            }
                        }
                    }
                },
                {
                    $match: {
                        value: {
                            $ne: 'no'
                        }
                    }
                },
                {
                    $addFields: {
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
                    $group: {
                        _id: '$value',
                        total: {
                            $sum: '$book.totalPrice'
                        }
                    }
                }
            ]);

            areaChartRevenueName = [current.name];
            areaChartRevenueValue = [getAreaChartRevenue[0]?.total || 0];
        } else {
            const monday = getDayOfWeek(date, 1);
            const tuesday = getDayOfWeek(date, 2);
            const wednesday = getDayOfWeek(date, 3);
            const thursday = getDayOfWeek(date, 4);
            const friday = getDayOfWeek(date, 5);
            const saturday = getDayOfWeek(date, 6);
            const sunday = getDayOfWeek(date, 7);

            const getAreaChartRevenue = await Order.aggregate([
                {
                    $addFields: {
                        value: {
                            $switch: {
                                branches: [
                                    {
                                        case: {
                                            $and: [
                                                {
                                                    $gte: ['$createdAt', monday.start]
                                                },
                                                {
                                                    $lte: ['$createdAt', monday.end]
                                                }
                                            ]
                                        },
                                        then: monday.name
                                    },
                                    {
                                        case: {
                                            $and: [
                                                {
                                                    $gte: ['$createdAt', tuesday.start]
                                                },
                                                {
                                                    $lte: ['$createdAt', tuesday.end]
                                                }
                                            ]
                                        },
                                        then: tuesday.name
                                    },
                                    {
                                        case: {
                                            $and: [
                                                {
                                                    $gte: ['$createdAt', wednesday.start]
                                                },
                                                {
                                                    $lte: ['$createdAt', wednesday.end]
                                                }
                                            ]
                                        },
                                        then: wednesday.name
                                    },
                                    {
                                        case: {
                                            $and: [
                                                {
                                                    $gte: ['$createdAt', thursday.start]
                                                },
                                                {
                                                    $lte: ['$createdAt', thursday.end]
                                                }
                                            ]
                                        },
                                        then: thursday.name
                                    },
                                    {
                                        case: {
                                            $and: [
                                                {
                                                    $gte: ['$createdAt', friday.start]
                                                },
                                                {
                                                    $lte: ['$createdAt', friday.end]
                                                }
                                            ]
                                        },
                                        then: friday.name
                                    },
                                    {
                                        case: {
                                            $and: [
                                                {
                                                    $gte: ['$createdAt', saturday.start]
                                                },
                                                {
                                                    $lte: ['$createdAt', saturday.end]
                                                }
                                            ]
                                        },
                                        then: saturday.name
                                    },
                                    {
                                        case: {
                                            $and: [
                                                {
                                                    $gte: ['$createdAt', sunday.start]
                                                },
                                                {
                                                    $lte: ['$createdAt', sunday.end]
                                                }
                                            ]
                                        },
                                        then: sunday.name
                                    }
                                ],
                                default: 'no'
                            }
                        }
                    }
                },
                {
                    $match: {
                        value: {
                            $ne: 'no'
                        }
                    }
                },
                {
                    $addFields: {
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
                    $group: {
                        _id: '$value',
                        total: {
                            $sum: '$book.totalPrice'
                        }
                    }
                }
            ]);

            areaChartRevenueName = [monday.name, tuesday.name, wednesday.name, thursday.name, friday.name, saturday.name, sunday.name];
            areaChartRevenueValue = [];
            for (let i = 0; i < 7; i++) {
                const temp = getAreaChartRevenue.find((item: any) => item._id === areaChartRevenueName[i]);

                areaChartRevenueValue.push(temp ? temp?.total : 0);
            }
        }

        return res.status(200).json({
            name: areaChartRevenueName,
            value: areaChartRevenueValue
        });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ error });
    }
};

const getCustomerByTime = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { startAt, endAt } = req.body;
        const startDate = moment(startAt).startOf('date').toISOString();
        const endDate = moment(endAt).endOf('date').toISOString();

        const result = (
            await Customer.aggregate([
                {
                    $addFields: {
                        id: {
                            $toObjectId: '$_id'
                        }
                    }
                },
                {
                    $match: {
                        ...(startAt && endAt
                            ? {
                                  createdAt: {
                                      $gte: new Date(startDate),
                                      $lte: new Date(endDate)
                                  }
                              }
                            : {})
                    }
                }
            ])
        ).length;

        return res.status(200).json({ totalCustomer: result });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ error });
    }
};

const getCustomerByBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type, time } = req.body;
        let customer: number = 0;
        let book: number = 0;

        let result = [];
        const now = new Date(time);
        if (type === 'month') {
            const start = getRangeMonth(now).start;
            const end = getRangeMonth(now).end;
            result = await Book.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: start,
                            $lte: end
                        }
                    }
                },
                {
                    $group: {
                        _id: '$customerId',
                        total: {
                            $sum: 1
                        }
                    }
                }
            ]);
        } else if (type === 'week') {
            const start = getRangeWeek(now).start;
            const end = getRangeWeek(now).end;
            result = await Book.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: start,
                            $lte: end
                        }
                    }
                },
                {
                    $group: {
                        _id: '$customerId',
                        total: {
                            $sum: 1
                        }
                    }
                }
            ]);
        } else if (type === 'date') {
            const start = getDate(now).start;
            const end = getDate(now).end;

            result = await Book.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: start,
                            $lte: end
                        }
                    }
                },
                {
                    $group: {
                        _id: '$customerId',
                        total: {
                            $sum: 1
                        }
                    }
                }
            ]);
        }

        result.forEach((item: any) => {
            book += item?.total;
        });

        return res.status(200).json({
            customer: result.length,
            book
        });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ error });
    }
};

export { getDashboard, getRevenueByTime, getCustomerByTime, getCustomerByBook };
