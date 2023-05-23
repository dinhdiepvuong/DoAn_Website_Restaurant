import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
import Customer from '../models/customer';
import { generateToken } from '../utils/JWT';

const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = new Customer({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });

        const result = await customer.save();

        return res.status(200).json({ customer: result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const findAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
    const { page, phone, name, email } = req.query;

    try {
        const result = await Customer.aggregate([
            {
                $addFields: {
                    id: { $toString: '$_id' }
                }
            },
            {
                $match: {
                    ...(phone
                        ? {
                              phone: {
                                  $regex: phone,
                                  $options: 'i'
                              }
                          }
                        : {}),
                    ...(name
                        ? {
                              name: {
                                  $regex: name,
                                  $options: 'i'
                              }
                          }
                        : {}),
                    ...(email
                        ? {
                              email: {
                                  $regex: email,
                                  $options: 'i'
                              }
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

        return res.status(200).json({ data: result[0].data, pagination: result[0].pagination });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteCustomer = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Customer.findByIdAndDelete(id)
        .then((customer) => res.status(200).json({ customer }))
        .catch((error) => res.status(500).json(error));
};

const findCustomerById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Customer.findById(id)
        .then((customer) => res.status(200).json({ customer }))
        .catch((error) => res.status(500).json({ error }));
};
const updateCustomer = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Customer.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((customer) => res.status(200).json({ customer }))
        .catch((error) => res.status(500).json({ error }));
};

const findUserByUsernameAndPassword = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    return Customer.aggregate([
        {
            $match: { username, password }
        },
        {
            $addFields: {
                roleObjectId: { $toObjectId: '$roleId' },
                id: '$_id'
            }
        },
        { $lookup: { from: 'roles', localField: 'roleObjectId', foreignField: '_id', as: 'role' } },
        { $unwind: '$role' },
        {
            $addFields: {
                'role.id': '$roleId'
            }
        },
        { $project: { roleObjectId: 0, roleId: 0, _id: 0, 'role._id': 0 } }
    ])
        .then(async (customers) => {
            const token = await generateToken(customers.at(0), process.env.TOKEN_SECRET_KEY, process.env.ACCESS_TOKEN_LIFE);
            console.log(token);
            res.status(200).json({
                customer: {
                    ...customers.at(0),
                    accessToken: token
                }
            });
        })
        .catch((error) => res.status(error).json({ error }));
};

export { findAllCustomers, createCustomer, findCustomerById, updateCustomer, deleteCustomer };
