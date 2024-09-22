import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { LatLngExpression } from "leaflet";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mediaQuery(query: string): boolean {
  const media = window.matchMedia(query);
  return media?.matches ?? false;
}

/**
 * Gets the coordinates from javascript navigator API
 * @returns {LatLngExpression | GeolocationPositionError}
 */
export function getUserCoordinates(): Promise<LatLngExpression | GeolocationPositionError> {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = [position.coords.latitude, position.coords.longitude] as LatLngExpression;
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