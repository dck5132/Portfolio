// Constants and Enums
import { Project } from "../../../shared/constants/information.enums";

export interface DetailedInformation {
    project: Project;
    heading: string;
    description: string;
    bulletPoints?: string[];
};
