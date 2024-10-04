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
