import { ImageInformation } from "../interfaces/information.interfaces";
import { ImageAlt, ImagePath } from "./image.enums";

// Generate image information for all enum values
export const ImagePathAndAltTextToImageConfig = Object.keys(ImagePath).reduce((acc, key) => {
  const enumKey = key as keyof typeof ImagePath;
  acc[enumKey] = {
    src: ImagePath[enumKey],
    alt: ImageAlt[enumKey]
  };
  return acc;
}, {} as Record<keyof typeof ImagePath, ImageInformation>);
