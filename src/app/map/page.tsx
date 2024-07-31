"use client"

import { MapContainer, TileLayer } from "react-leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import AddMarker from "@/components/map/AddMarker";
function Map() {

    return (
        <div>
            <MapContainer className="h-screen" center={[21.168128,72.7973888]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <AddMarker />
            </MapContainer>
        </div>
    )
}

export default Map;