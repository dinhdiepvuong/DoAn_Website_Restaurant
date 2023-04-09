import mongoose, { Document, Schema } from 'mongoose';
import { OrderType } from '../interfaces';

export interface OrderModel extends OrderType, Document {}

const OrderSchema = new Schema(
    {
        bookId: { type: String, required: true },
        orderDate: { type: Date, required: true },
        paymentMethod: { type: Number, required: true }
    },
    {
        timestamps: true,
        collection: 'orders'
    }
);

OrderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default mongoose.model<OrderModel>('order', OrderSchema);
