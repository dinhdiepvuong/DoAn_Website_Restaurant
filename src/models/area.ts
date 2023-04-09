import mongoose, { Schema, Document } from 'mongoose';
import { AreaType } from '../interfaces/index';

export interface AreaModel extends AreaType, Document {}

const AreaSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        status: { type: Number, required: true },
        avatar: { type: String, required: true }
    },
    {
        timestamps: true,
        collection: 'areas'
    }
);
AreaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<AreaModel>('area', AreaSchema);
