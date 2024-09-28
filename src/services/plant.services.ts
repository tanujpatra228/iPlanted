import { AddPlantFormType } from "@/schema/newPlantSchama";

export async function addNewPlant(values: AddPlantFormType): Promise<AddNewPlantServiceResponseType> {
    try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('image', values.image);
        if (values?.notes) formData.append('notes', values?.notes);
        formData.append('coordinates', JSON.stringify(values.coordinates));

        const res = await fetch("/api/plant", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        return {
            success: true,
            data: data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

type AddNewPlantServiceResponseType = {
    success: boolean,
    data: any
} | {
    success: boolean,
    message: string
}