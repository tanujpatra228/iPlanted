import dynamic from 'next/dynamic';
const MapWrapper = dynamic(() => import('@/components/map/MapWrapper'), { ssr: false });

function Map() {

    return (
        <div>
            <MapWrapper />
        </div>
    )
}

export default Map;