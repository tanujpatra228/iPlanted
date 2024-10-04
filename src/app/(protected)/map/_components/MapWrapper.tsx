"use client"
import { getUserCoordinates } from "@/services/location.service";
import { useQuery } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from 'react-leaflet';
import AddMarker from '../_components/AddMarker';
import { NearByPlants } from "./NearByPlants";
import UserLocationMarker from "./UserLocationMarker";

function MapWrapper() {
    const liveLocationQuery = useQuery({
        queryKey: ['liveLovation'],
        queryFn: getUserCoordinates,
        refetchInterval: 10000
    });
    const coordinates = liveLocationQuery.data instanceof GeolocationPositionError ? undefined : liveLocationQuery.data;

    if (liveLocationQuery.isLoading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                Getting your current location
            </div>
        )
    }

    if (!coordinates) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                Location access is required
            </div>
        )
    }

    return (
        <div>
            {
                <MapContainer className="h-screen" center={coordinates} zoom={20}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {!!coordinates && <UserLocationMarker coordinates={coordinates} />}
                    
                    <NearByPlants coordinates={coordinates} />

                    <AddMarker />
                </MapContainer>
            }
        </div>
    )
}

export default MapWrapper;