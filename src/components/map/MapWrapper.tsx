"use client"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from 'react-leaflet';
import AddMarker from '@/components/map/AddMarker';

function MapWrapper() {

    return (
        <div>
            {
                !!window && (
                    <MapContainer className="h-screen" center={[21.168128, 72.7973888]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <AddMarker />
                    </MapContainer>
                )
            }
        </div>
    )
}

export default MapWrapper;