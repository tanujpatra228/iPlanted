import { PlantType } from "@/model/Plant";
import { getNearByPlants } from "@/services/plant.services";
import { useQuery } from "@tanstack/react-query";
import { Icon, LatLngTuple } from "leaflet";
import Image from "next/image";
import React from "react";
import { Marker, Popup } from "react-leaflet";

const plantIcon = new Icon({
    iconUrl: 'https://res.cloudinary.com/dopcbgrcs/image/upload/w_50/h_63/f_auto/plant-icon_o1kscz.svg',
    iconSize: [50, 50],
    iconAnchor: [25,50],
    popupAnchor: [0, -25],
    className: 'object-contain'
});

function NearByPlants({ lat, lng }: { lat: number, lng: number }) {
    const coordinates = [lat, lng] as LatLngTuple;
    const nearByPlantsQuery = useQuery({
        queryKey: ['nearByPlants', coordinates],
        enabled: !!(lat && lng),
        queryFn: getNearByPlants,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60,
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
export default React.memo(NearByPlants);