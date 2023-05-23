import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
import Table from '../models/table';
import { generateToken } from '../utils/JWT';

const createTable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const table = new Table({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });

        const result = await table.save();

        return res.status(200).json({ table: result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const createMultiTable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tables } = req.body;
        const data: any[] = [];

        tables.forEach((table: any) => {
            const newTable = new Table({
                _id: new mongoose.Types.ObjectId(),
                ...table
            });

            data.push(newTable);
        });

        const result = await Table.insertMany(data, { ordered: true });

        return res.status(200).json({ tables: result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const findAllTables = async (req: Request, res: Response, next: NextFunction) => {
    const { page, areaId, status, name } = req.query;

    try {
        const result = await Table.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' }
                }
            },
            {
                $match: {
                    ...(status ? { status: Number(status) } : {}),
                    ...(areaId ? { areaId } : {}),
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
                    data: [
                        {
                            $addFields: {
                                areaObjectId: {
                                    $toObjectId: '$areaId'
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'areas',
                                localField: 'areaObjectId',
                                foreignField: '_id',
                                as: 'area'
                            }
                        },
                        {
                            $unwind: '$area'
                        },
                        {
                            $addFields: {
                                areaName: '$area.name'
                            }
                        },
                        { $skip: page ? (Number(page) - 1) * 10 : 0 },
                        { $limit: page ? 10 : 9999 }
                    ],

                    pagination: [{ $count: 'total' }]
                }
            }
        ]);

        return res.status(200).json({ data: result[0].data, pagination: result[0].pagination });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteTable = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Table.findByIdAndDelete(id)
        .then((table) => res.status(200).json({ table }))
        .catch((error) => res.status(500).json(error));
};

const findTableById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const result = await Table.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' }
                }
            },
            {
                $match: {
                    id
                }
            },
            {
                $addFields: {
                    areaObjectId: {
                        $toObjectId: '$areaId'
                    }
                }
            },
            {
                $lookup: {
                    from: 'areas',
                    localField: 'areaObjectId',
                    foreignField: '_id',
                    as: 'area'
                }
            },
            {
                $unwind: '$area'
            }
        ]);

        return res.status(200).json({ table: result[0] });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
const updateTable = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Table.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((table) => res.status(200).json({ table }))
        .catch((error) => res.status(500).json({ error }));
};

export { findAllTables, createTable, findTableById, updateTable, deleteTable, createMultiTable };
