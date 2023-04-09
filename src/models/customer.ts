import mongoose, { Schema, Document } from 'mongoose';
import { CustomerType } from '../interfaces/index';

export interface UserModel extends CustomerType, Document {}

const CustomerSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        identity: { type: String, required: false },
        gender: { type: Number, required: true },
        avatar: { type: String, required: true },
        birthday: { type: Date, required: true },
        address: {
            street: { type: String, required: true },
            ward: { type: String, required: true },
            district: { type: String, required: true },
            city: { type: String, required: true }
        }
    },
    {
        timestamps: true,
        collection: 'customers'
    }
);
CustomerSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<UserModel>('customer', CustomerSchema);
