import { PLANT_TYPE } from "@/consts";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const PLANT_TYPE_CODES = Object.values(PLANT_TYPE).map((type) => type.code);

export const addNewPlantSchema = z.object({
    title: z.string().min(2).max(50),
    image: z
        .any()
        .refine((file) => file?.size, `Image is required`)
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),
    coordinates: z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
    }),
    notes: z.string().optional(),
    plantType: z.string().optional(),
});
export type AddPlantFormType = z.infer<typeof addNewPlantSchema>;