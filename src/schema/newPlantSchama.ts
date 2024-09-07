import { z } from "zod";

export const addNewPlantSchema = z.object({
    title: z.string().min(2).max(50),
    image: z.string().optional(),
});
export type AddPlantFormType = z.infer<typeof addNewPlantSchema>;