import { QueryFunction } from "@tanstack/react-query";
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

export const getNearByPlants:QueryFunction = async ({ queryKey, signal }): Promise<Record<string, any>[]> => {
    const [_, coordinates] = queryKey as [string, LatLngTuple];
    const [lat, lng] = coordinates;
    const res = await fetch(`api/plant?lng=${lng}&lat=${lat}`, { signal });
    const result = await res.json();
    return result;
}