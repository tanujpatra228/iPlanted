import { PlantType } from "@/model/Plant";
import { getNearByPlants } from "@/services/location.service";
import { useQuery } from "@tanstack/react-query";
import { Icon, LatLngTuple } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import plantIconSvg from "/public/plant-icon.svg";
import Image from "next/image";

const plantIcon = new Icon({
    iconUrl: plantIconSvg.src,
    iconSize: [50, 50],
    iconAnchor: [25,50],
    popupAnchor: [0, -25]
});

export function NearByPlants({ coordinates }: { coordinates: LatLngTuple }) {
    const nearByPlantsQuery = useQuery({
        queryKey: ['nearByPlants', coordinates],
        enabled: !!coordinates,
        queryFn: getNearByPlants,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false
    });
    const { plants } = nearByPlantsQuery.data ? nearByPlantsQuery.data as { plants: PlantType[] } : { plants: [] };
    if (nearByPlantsQuery.isLoading) return null;

    return (
        <>
            {
                plants.map((plant: PlantType, i: number) => {
                    const [lng, lat]: LatLngTuple = plant?.location?.coordinates || [];
                    return (
                        <Marker key={i} position={[lat, lng]} icon={plantIcon}>
                            <Popup>
                                <Image src={plant.image} width={100} height={100} alt={plant.title} />
                            </Popup>
                        </Marker>
                    )
                })
            }
        </>
    );
}