import mongoose, { Schema, Document } from 'mongoose';
import { ProductTypeType } from '../interfaces/index';

export interface ProductTypeModel extends ProductTypeType, Document {}

const ProductTypeSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        status: { type: Number, required: true },
        avatar: { type: String, required: true },
        type: { type: Number, required: true }
    },
    {
        timestamps: true,
        collection: 'productTypes'
    }
);
ProductTypeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<ProductTypeModel>('productType', ProductTypeSchema);
