"use client"
import { LatLngLiteral, LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { Circle, useMap } from "react-leaflet";

function UserLocationMarker({ coordinates }: { coordinates: LatLngLiteral | LatLngTuple }) {
    const map = useMap();

    useEffect(() => {
        map.locate();
    }, [coordinates]);

    return (
        <>
            {/* User Location Marker */}
            <Circle center={coordinates} radius={5} />
            {/* Plantable Area */}
            <Circle center={coordinates} radius={150} color="#3388ff50" fill={false} />
        </>
    )
}

export default UserLocationMarker;