import mongoose, { Schema, Document } from 'mongoose';
import { ProductType } from '../interfaces/index';

export interface ProductModel extends ProductType, Document {}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: false },
        status: { type: Number, required: true },
        avatar: { type: String, required: true },
        productTypeId: { type: String, required: true },
        type: { type: Number, required: true }
    },
    {
        timestamps: true,
        collection: 'products'
    }
);
ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<ProductModel>('product', ProductSchema);
