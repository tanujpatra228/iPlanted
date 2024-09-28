"use client"
import { getUserCoordinates } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from 'react-leaflet';
import AddMarker from '../_components/AddMarker';
import UserLocationMarker from "./UserLocationMarker";

function MapWrapper() {
    const liveLocationQuery = useQuery({
        queryKey: ['liveLovation'],
        queryFn: getUserCoordinates,
        refetchInterval: 2000
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
                <MapContainer className="h-screen" center={coordinates} zoom={20} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <UserLocationMarker coordinates={coordinates} />

                    <AddMarker />
                </MapContainer>
            }
        </div>
    )
}

export default MapWrapper;