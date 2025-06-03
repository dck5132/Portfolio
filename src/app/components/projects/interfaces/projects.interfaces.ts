import { ProjectTypes } from "../constants/projects.enums";

export interface ProjectFilters {
    class?: string;
    title: string;
    filter: ProjectTypes
}
