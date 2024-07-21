import { LatLng } from "leaflet";
import { useState } from "react";
import { Circle, Popup, useMapEvents } from "react-leaflet";
import AddPlantPanel from "../AddPlantPanel";

function AddMarker() {
    const [position, setPosition] = useState<LatLng | null>(null);
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });
    const handleOpenChange = (open: boolean) => {
        if (!open) setPosition(null);
    }
    return (
        <>
            {
                position && (
                    <>
                        <Circle center={position} radius={200}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Circle>
                        <AddPlantPanel isOpen={Boolean(position)} position={position} onOpenChange={handleOpenChange} />
                    </>
                )
            }
        </>
    )
}

export default AddMarker;