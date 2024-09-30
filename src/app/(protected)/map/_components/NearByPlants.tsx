import { PlantType } from "@/model/Plant";
import { getNearByPlants } from "@/services/location.service";
import { useQuery } from "@tanstack/react-query";
import { LatLngTuple } from "leaflet";
import { Circle } from "react-leaflet";

export function NearByPlants({ coordinates }: { coordinates: LatLngTuple }) {
    const nearByPlantsQuery = useQuery({
        queryKey: ['nearByPlants', coordinates],
        enabled: !!coordinates,
        queryFn: getNearByPlants
    });
    const { plants } = nearByPlantsQuery.data ? nearByPlantsQuery.data as { plants: PlantType[] } : { plants: [] };
    if (nearByPlantsQuery.isLoading) return null;

    return (
        <>
            {
                plants.map((plant: PlantType) => {
                    const [lat, lng]: LatLngTuple = plant?.location?.coordinates || [];
                    return (<Circle center={[lng, lat]} radius={5} color="#4cff33" />)
                })
            }
        </>
    );
}