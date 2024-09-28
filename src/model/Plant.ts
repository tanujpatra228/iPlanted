import mongoose, { Schema, Document } from "mongoose";

const PlantSchema: Schema<PlantType> = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    },
    notes: {
        type: String,
        trim: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    plantedBy: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

export type PlantType = Document & {
    title: string;
    plantedBy: string;
    image: string;
    notes: string;
    location: {
        type: string;
        coordinates: [number, number]; // [longitude, latitude]
    };
}

const Plant = mongoose.models.Plants as mongoose.Model<PlantType> || mongoose.model<PlantType>('Plants', PlantSchema);
export default Plant;