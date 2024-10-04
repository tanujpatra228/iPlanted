import { PlantType } from "@/model/Plant";
import { AddPlantFormType } from "@/schema/newPlantSchama";
import { QueryFunction } from "@tanstack/react-query";
import { LatLngTuple } from "leaflet";

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

export const getNearByPlants:QueryFunction<NearByPlantsResponseType> = async function ({ queryKey, signal }) {
    try {
        const [_, coordinates] = queryKey as [string, LatLngTuple];
        const [lat, lng] = coordinates;
        const res = await fetch(`api/plant?lng=${lng}&lat=${lat}`, { signal });
        const result = await res.json();
        if (result?.plants) {
            return {
                success: true,
                plants: result.plants
            }
        }
        return {
            success: false,
            message: "No plants found"
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

type NearByPlantsResponseType = {
    success: true,
    plants: PlantType[]
} | {
    success: false,
    message: string
}

type AddNewPlantServiceResponseType = {
    success: boolean,
    data: any
} | {
    success: boolean,
    message: string
}