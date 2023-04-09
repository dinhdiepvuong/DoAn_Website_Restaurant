import mongoose, { Schema, Document } from 'mongoose';
import { BookType, TableBookType } from '../interfaces/index';

export interface BookModel extends BookType, Document {}

const BookSchema: Schema = new Schema(
    {
        customerId: { type: String, required: true },
        tables: { type: Array<TableBookType>, required: true},
        customerNote: { type: String, required: false },
        checkoutAt: { type: Date, required: true },
        timeToUse: { type: Number, required: true },
        quantityCustomer: { type: Number, required: true },
        status: { type: Number, required: true },
        paymentMethod: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        deposit: { type: Number, required: true },
        bookDetailIds: { type: Array<String>, required: true},
    },
    {
        timestamps: true,
        collection: 'books'
    }
);
BookSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<BookModel>('book', BookSchema);
