import { LatLng } from "leaflet";
import { useState } from "react";
import { Circle, Popup, useMapEvents } from "react-leaflet";

function AddMarker() {
    const [position, setPosition] = useState<LatLng>();
    const map = useMapEvents({
        click(e) {
            console.log('ee', e);
            setPosition(e.latlng);
            map.locate()
        },
    });
    return (
        <>
            {
                position && (
                    <Circle center={position} radius={200}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Circle>
                )
            }
        </>
    )
}

export default AddMarker;