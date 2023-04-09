import mongoose, { Schema, Document } from 'mongoose';
import { BookDetailType } from '../interfaces/index';

export interface BookDetailModel extends BookDetailType, Document {}

const BookDetailSchema: Schema = new Schema(
    {
        quantity: { type: Number, required: true },
        productId: { type: String, required: true },
        note: { type: String, required: false },
        status: { type: Number, required: false }
    },
    {
        timestamps: true,
        collection: 'bookDetails'
    }
);
BookDetailSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<BookDetailModel>('bookDetail', BookDetailSchema);
