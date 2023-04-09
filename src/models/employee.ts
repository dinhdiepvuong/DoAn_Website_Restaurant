import mongoose, { Schema, Document } from 'mongoose';
import { EmployeeType } from '../interfaces';

export interface EmployeeModel extends EmployeeType, Document {}

const EmployeeSchema = new Schema(
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
            street: { type: String, required: true },
            ward: { type: String, required: true },
            district: { type: String, required: true },
            city: { type: String, required: true }
        },
        username: { type: String, required: true },
        password: { type: String, required: true },
        refreshToken: { type: String, required: false }
    },
    {
        timestamps: true,
        collection: 'employees'
    }
);

EmployeeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<EmployeeModel>('employee', EmployeeSchema);
