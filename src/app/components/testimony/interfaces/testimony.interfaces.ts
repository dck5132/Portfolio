import { Project } from "../../../shared/constants/information.enums";

export interface Testimonial {
    author: string;
    position: string;
    relativePosition: string;
    company: Project;
    testimony: string[];
};