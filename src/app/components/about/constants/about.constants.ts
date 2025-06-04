// Interfaces
import { AboutInformation } from "../interfaces/about.interfaces";

// Constants and Enums
import {
    Degree,
    Email,
    Location
} from "../../../shared/constants/information.constants";
import { GithubPath, LinkedInPath } from "../../../shared/constants/routing.constants";
import { InformationType } from "../../../shared/constants/information.enums";

export const AboutDetails: AboutInformation[] = [
    {
        label: 'Degree',
        type: InformationType.TEXT,
        detail: Degree
    },
    {
        label: 'Location',
        type: InformationType.TEXT,
        detail: Location
    },
    {
        label: 'Email',
        type: InformationType.EMAIL,
        detail: Email
    },
    {
        label: 'LinkedIn',
        type: InformationType.LINK,
        detail: LinkedInPath
    },
    {
        label: 'Github',
        type: InformationType.LINK,
        detail: GithubPath
    },
];