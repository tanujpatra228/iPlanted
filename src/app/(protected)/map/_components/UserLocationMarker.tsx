"use client"
import { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { Circle, useMap } from "react-leaflet";

function UserLocationMarker({ coordinates }: { coordinates: LatLngTuple }) {
    const map = useMap();
    const [lat, lng] = coordinates;

    useEffect(() => {
        map.flyTo([lat, lng]);
    }, [lat, lng]);

    return (
        <>
            {/* User Location Marker */}
            <Circle center={[lat, lng]} radius={5} />
            {/* Plantable Area */}
            <Circle center={[lat, lng]} radius={150} color="#3388ff50" fill={false} />
        </>
    )
}

export default UserLocationMarker;