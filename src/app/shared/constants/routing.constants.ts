// External Libraries
import {
    faGithub,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
    faCode,
    faHouseChimney
} from "@fortawesome/free-solid-svg-icons";
import {
    faComments,
    faFileLines,
    faImages,
    faUser
} from "@fortawesome/free-regular-svg-icons"
// Interfaces
import { Links } from "../interfaces/routing.interfaces";
import { InternalPaths } from "./routing.enums";

// External Paths
export const LinkedInPath = 'https://www.linkedin.com/in/cyril-kalikin/';
export const GithubPath = 'https://github.com/dck5132';
export const ExperianPath = 'https://usa.experian.com/login/index';

export const InternalRoutes: Links[] = [
    {
        id: 'hero',
        path: InternalPaths.HERO,
        icon: faHouseChimney,
        label: 'Home'
    },
    {
        id: 'about',
        path: InternalPaths.ABOUT,
        icon: faUser,
    },
    {
        id: 'skills',
        path: InternalPaths.SKILLS,
        icon: faCode,
    },
    {
        id: 'resume',
        path: InternalPaths.RESUME,
        icon: faFileLines
    },
    {
        id: 'projects',
        path: InternalPaths.PROJECTS,
        icon: faImages,
    },
        {
        id: 'testimonials',
        path: InternalPaths.TESTIMONIALS,
        icon: faComments,
    },
];

export const ExternalRoutes: Links[] = [
    {
        icon: faLinkedin,
        id: 'linkedin',
        path: LinkedInPath,
    },
    {   
        icon: faGithub,
        id: 'github',
        path: GithubPath,
    }
];
