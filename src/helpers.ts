import { PLANT_TYPE, PlantCodeType } from "./consts";

export const getPlantTypeLabel = (code: PlantCodeType): string => {
  const type = Object.values(PLANT_TYPE).find((type) => type.code === code);
  return type ? type.label : "Unknown";
};
  
export const getPlantTypeCode = (label: string): PlantCodeType | null => {
  const type = Object.values(PLANT_TYPE).find((type) => type.label === label);
  return type ? type.code : null;
};