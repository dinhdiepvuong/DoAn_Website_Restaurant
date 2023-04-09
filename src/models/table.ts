import mongoose, { Schema, Document } from 'mongoose';
import { TableType } from '../interfaces/index';

export interface TableModel extends TableType, Document {}

const TableSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        status: { type: Number, required: true },
        areaId: { type: String, required: true }
    },
    {
        timestamps: true,
        collection: 'tables'
    }
);
TableSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export default mongoose.model<TableModel>('table', TableSchema);
