import mongoose, { Schema, Document } from 'mongoose';
import { DrinkType } from '../interfaces/index';

export interface DrinkModel extends DrinkType, Document {}

const DrinkSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: false },
        status: { type: Number, required: true },
        avatar: { type: String, required: true }
    },
    {
        timestamps: true,
        collection: 'drinks'
    }
);
DrinkSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<DrinkModel>('drink', DrinkSchema);
