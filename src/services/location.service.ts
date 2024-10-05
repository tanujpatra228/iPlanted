import { LatLngTuple } from "leaflet";

/**
 * Gets the coordinates from javascript navigator API
 * @returns {LatLngTuple | GeolocationPositionError}
 */
export function getUserCoordinates(): Promise<LatLngTuple | GeolocationPositionError> {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coordinates = [position.coords.latitude, position.coords.longitude] as LatLngTuple;
                    resolve(coordinates);
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            const error = {
                code: GeolocationPositionError.POSITION_UNAVAILABLE,
                message: "Geolocation is not supported by this browser."
            }
            reject(error as GeolocationPositionError);
        }
    });
}

export function getDistanceTraveledInKm (prevLatLng: LatLngTuple, newLatLng: LatLngTuple): number {
    const [lat1, lng1] = prevLatLng;
    const [lat2, lng2] = newLatLng;
    const deg2rad = (deg: number) => deg * (Math.PI / 180);
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

export function fetchNearByPlants(prevLatLng: LatLngTuple | null, newLatLng: LatLngTuple): boolean {
    if (!prevLatLng) return true;
    const distance = getDistanceTraveledInKm(prevLatLng, newLatLng);
    return distance > 0.5; // approx 500 meters
}