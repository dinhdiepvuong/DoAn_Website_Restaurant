// import { Request, Response, NextFunction } from 'express';
// import User from '../models/user';
// import mongoose from 'mongoose';
// import Role from '../models/role';
// import { generateToken } from '../utils/JWT';
// const bcrypt = require('bcryptjs');

// const SALT = process.env.SALT || '10';
// const findAllUsers = (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     return User.aggregate([
//         {
//             $addFields: {
//                 roleObjectId: { $toObjectId: '$roleId' },
//                 id: { $toString: '$_id' }
//             }
//         },
//         {
//             $match: {
//                 id: { $ne: id }
//             }
//         },
//         {
//             $lookup: {
//                 from: 'roles',
//                 localField: 'roleObjectId',
//                 foreignField: '_id',
//                 as: 'role'
//             }
//         },
//         {
//             $unwind: '$role'
//         }
//     ])
//         .then((users) => res.status(200).json({ users }))
//         .catch((error) => res.status(500).json({ error }));
// };

// const createUserCustomer = (req: Request, res: Response, next: NextFunction) => {
//     return Role.findOne({ name: 'CUSTOMER' })
//         .then((role) => {
//             const data = req.body;
//             var salt = bcrypt.genSaltSync(parseInt(SALT));
//             var hash = bcrypt.hashSync(data.password, salt);
//             const user = new User({
//                 _id: new mongoose.Types.ObjectId(),
//                 ...data,
//                 password: hash,
//                 roleId: role?.id
//             });
//             return user
//                 .save()
//                 .then((user) => res.status(200).json({ user: user, role: role }))
//                 .catch((error) => res.status(500).json({ error }));
//         })
//         .catch((error) => res.status(500).json({ error }));
// };
// const deleteUser = (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     return User.findByIdAndDelete(id)
//         .then((user) => res.status(200).json({ user }))
//         .catch((error) => res.status(500).json({ error }));
// };

// const updateUser = (req: Request, res: Response, next: NextFunction) => {
//     const data = req.body;
//     return User.findByIdAndUpdate(data.id, { ...data }, { returnOriginal: false })
//         .then((user) => res.status(200).json({ user }))
//         .catch((error) => res.status(500).json({ error }));
// };
// const updateStatusUser = (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     const { status } = req.body;
//     return User.updateOne({ _id: id }, { status }, { returnOriginal: false })
//         .then((user) => res.status(200).json({ user }))
//         .catch((error) => res.status(500).json({ error }));
// };

// const findUserById = (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     return User.aggregate([
//         {
//             $addFields: {
//                 roleObjectId: { $toObjectId: '$roleId' },
//                 id: { $toString: '$_id' }
//             }
//         },
//         {
//             $match: {
//                 id: id
//             }
//         },
//         {
//             $lookup: {
//                 from: 'roles',
//                 localField: 'roleObjectId',
//                 foreignField: '_id',
//                 as: 'role'
//             }
//         },
//         {
//             $unwind: '$role'
//         }
//     ])
//         .then((users) => res.status(200).json({ user: users.at(0) }))
//         .catch((error) => res.status(500).json({ error }));
// };

// const getAllCustomerByStatus = (req: Request, res: Response, next: NextFunction) => {
//     const { status } = req.params;
//     return User.aggregate([
//         {
//             $addFields: {
//                 roleObjectId: { $toObjectId: '$roleId' },
//                 id: { $toString: '$_id' }
//             }
//         },
//         {
//             $lookup: {
//                 from: 'roles',
//                 localField: 'roleObjectId',
//                 foreignField: '_id',
//                 as: 'role'
//             }
//         },
//         {
//             $unwind: '$role'
//         },
//         {
//             $match: {
//                 'role.name': 'CUSTOMER',
//                 status
//             }
//         }
//     ])
//         .then((users) => res.status(200).json({ users }))
//         .catch((error) => res.status(500).json({ error }));
// };

// const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const data = req.body;
//         const accessToken = await generateToken(data, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_LIFE);
//         const refreshToken = await generateToken(data, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_LIFE);
//         const result = await User.findByIdAndUpdate(data.id, {
//             ...data,
//             refreshToken
//         }, { returnOriginal: false });
//         return res.status(200).json({
//             user: {
//                 ...result,
//                 accessToken
//             }
//         })
//     } catch (error) {
//         return res.status(500).json(({ error }))
//     }
// }
// export { findAllUsers, deleteUser, updateUser, createUserCustomer, updateStatusUser, findUserById, getAllCustomerByStatus, updateProfile };
