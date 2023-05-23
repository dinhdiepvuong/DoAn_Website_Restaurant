import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
import Employee from '../models/employee';
import { generateToken } from '../utils/JWT';

const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employee = new Employee({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });

        const result = await employee.save();

        return res.status(200).json({ employee: result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const findAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
    const { page, phone, name, email } = req.query;

    try {
        const result = await Employee.aggregate([
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

const deleteEmployee = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Employee.findByIdAndDelete(id)
        .then((employee) => res.status(200).json({ employee }))
        .catch((error) => res.status(500).json(error));
};

const findEmployeeById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    return Employee.findById(id)
        .then((employee) => res.status(200).json({ employee }))
        .catch((error) => res.status(500).json({ error }));
};
const updateEmployee = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return Employee.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
        .then((employee) => res.status(200).json({ employee }))
        .catch((error) => res.status(500).json({ error }));
};

const findUserByUsernameAndPassword = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    return Employee.aggregate([
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
        .then(async (employees) => {
            const token = await generateToken(employees.at(0), process.env.TOKEN_SECRET_KEY, process.env.ACCESS_TOKEN_LIFE);
            console.log(token);
            res.status(200).json({
                employee: {
                    ...employees.at(0),
                    accessToken: token
                }
            });
        })
        .catch((error) => res.status(error).json({ error }));
};

export { findAllEmployees, createEmployee, findEmployeeById, updateEmployee, deleteEmployee };
