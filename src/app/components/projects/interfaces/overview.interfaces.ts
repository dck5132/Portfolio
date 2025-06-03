// Interfaces
import { ImageInformation } from "../../../shared/interfaces/information.interfaces";
import { Links } from "../../../shared/interfaces/routing.interfaces";
// Constants and Enums
import { ProjectTypes } from "../constants/projects.enums";

export interface overviewInformation {
    avatar: ImageInformation;
    description: string;
    project: string;
    projectImage?: ImageInformation
    link?: Links
    openButtonLabel: string;
    type: ProjectTypes
    subtitle?: string;
}