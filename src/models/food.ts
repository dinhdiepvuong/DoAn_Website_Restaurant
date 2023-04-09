import mongoose, { Schema, Document } from 'mongoose';
import { FoodType } from '../interfaces/index';

export interface FoodModel extends FoodType, Document {}

const FoodSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: false },
        status: { type: Number, required: true },
        avatar: { type: String, required: true }
    },
    {
        timestamps: true,
        collection: 'foods'
    }
);
FoodSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<FoodModel>('food', FoodSchema);
