import mongoose, { Schema, Document } from 'mongoose';
import { AdminType } from '../interfaces';

export interface AdminModel extends AdminType, Document {}

const AdminSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        avatar: { type: String, required: true },
        identity: { type: String, required: false },
        gender: { type: Number, required: true },
        birthday: { type: Date, required: false },
        status: { type: Number, required: true },
        address: {
            street: { type: String, required: false },
            ward: { type: String, required: false },
            district: { type: String, required: false },
            city: { type: String, required: false }
        },
        username: { type: String, required: true },
        password: { type: String, required: true },
        refreshToken: { type: String, required: false }
    },
    {
        timestamps: true,
        collection: 'admins'
    }
);

AdminSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<AdminModel>('admin', AdminSchema);
