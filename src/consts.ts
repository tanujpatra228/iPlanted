export const SESSION_KEY = "next-session";

export const PLANT_TYPE = {
    OUTDOOR: { code: 1, label: "Outdoor" },
    INDOOR: { code: 2, label: "Indoor" },
    UNKNOWN: { code: 3, label: "Unknown" },
};

export type PlantCodeType = (typeof PLANT_TYPE)[keyof typeof PLANT_TYPE]["code"];