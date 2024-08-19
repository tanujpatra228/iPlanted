import Header from '@/components/Header';
import dynamic from 'next/dynamic';
const MapWrapper = dynamic(() => import('@/components/map/MapWrapper'), { ssr: false });

function Map() {

    return (
        <div className="relative">
            <Header />
            <MapWrapper />
        </div>
    )
}

export default Map;