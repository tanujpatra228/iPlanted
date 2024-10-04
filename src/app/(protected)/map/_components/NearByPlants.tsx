import { PlantType } from "@/model/Plant";
import { getNearByPlants } from "@/services/plant.services";
import { useQuery } from "@tanstack/react-query";
import { Icon, LatLngTuple } from "leaflet";
import Image from "next/image";
import { Marker, Popup } from "react-leaflet";
import plantIconSvg from "/public/plant-icon.svg";

const plantIcon = new Icon({
    iconUrl: plantIconSvg.src,
    iconSize: [50, 50],
    iconAnchor: [25,50],
    popupAnchor: [0, -25]
});

export function NearByPlants({ coordinates }: { coordinates: LatLngTuple }) {
    const [lat, lng] = coordinates;
    const nearByPlantsQuery = useQuery({
        queryKey: ['nearByPlants', [lat.toFixed(7), lng.toFixed(7)]],
        enabled: !!coordinates,
        queryFn: getNearByPlants,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false
    });
    const { plants } = nearByPlantsQuery.isSuccess && nearByPlantsQuery.data.success ? nearByPlantsQuery.data : {plants: [] as PlantType[]};

    if (nearByPlantsQuery.isLoading) return null;

    return (
        <>
            {
                plants.map((plant, i: number) => {
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