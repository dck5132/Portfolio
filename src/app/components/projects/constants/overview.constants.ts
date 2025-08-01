// Interfaces
import { overviewInformation } from "../interfaces/overview.interfaces";

// Constants and Enums
import { ProjectTypes } from "./projects.enums";
import { JobTitle, Project } from "../../../shared/constants/information.enums";

// Constants and Enums
import { ImagePathAndAltTextToImageConfig } from "../../../shared/constants/image.constants";

export const ProjectOverviews: overviewInformation[] = [
    {
        project: Project.EXPERIAN,
        avatar: ImagePathAndAltTextToImageConfig.Angular,
        type: ProjectTypes.PROFESSIONAL,
        subtitle: JobTitle.SOFTWARE_ENGINEER,
        projectImage: ImagePathAndAltTextToImageConfig.Experian,
        description: 'At Experian, I contributed to key regulatory features including Security Freeze, Credit Lock, Disputes, and the Annual Credit Report by leading API migrations, enhancing accessibility, and helping transition legacy functionality to a modern micro front-end architecture.',
        openButtonLabel: 'More information',
        link: {
            id: Project.EXPERIAN,
            path: 'https://usa.experian.com/login/index',
            label: 'Experian'
        }
    },
    {
        project: Project.AMSTED_DIGITAL,
        avatar: ImagePathAndAltTextToImageConfig.Angular,
        type: ProjectTypes.PROFESSIONAL,
        subtitle: JobTitle.WEB_DEVELOPER,
        projectImage: ImagePathAndAltTextToImageConfig.Amsted,
        description: 'At Amsted Digital, I developed scalable, user-facing features using integrated third party libraries like Highcharts, Google Maps API, and AG-Grid into a custom interactive data visualization tool, and led front-end deployments while supporting the transition to CI/CD pipelines.',
        openButtonLabel: 'More information'
    },
    {
        project: Project.KNOWLEDGENT,
        avatar: ImagePathAndAltTextToImageConfig.JavaScript,
        type: ProjectTypes.PROFESSIONAL,
        subtitle: JobTitle.WEB_DEVELOPER,
        projectImage: ImagePathAndAltTextToImageConfig.Knowledgent,
        description: 'At Knowledgent, I developed and optimized user-facing features for an internal website using JavaScript, jQuery, PHP, and SQL, while self-learning Angular, generating analytic reports, and providing full-cycle web support and device troubleshooting.',
        openButtonLabel: 'More information'
    },
    {
        project: Project.EVERGLADES_TECHNOLOGIES,
        avatar: ImagePathAndAltTextToImageConfig.JavaScript,
        type: ProjectTypes.PROFESSIONAL,
        subtitle: JobTitle.INTERN_AND_FREELANCE_DEVELOPER,
        projectImage: ImagePathAndAltTextToImageConfig.Everglades,
        description: 'As a freelance developer and intern, I built and maintained responsive, user-facing web applications using PHP, JavaScript, jQuery, and MySQL to implement features like form validation, email notifications, and real-time data mapping with Google Maps API while ensuring cross-browser compatibility and scalability.',
        openButtonLabel: 'More information'
    },
    {
        project: Project.EFD,
        avatar: ImagePathAndAltTextToImageConfig.Angular,
        type: ProjectTypes.PERSONAL,
        subtitle: JobTitle.WEB_DEVELOPER,
        description: 'A lightweight custom Angular application built during personal downtime to serve as a random map and time selector for Escape from Tarkov. Continuously maintained and iterated over the years to stay current with game updates and improve usability. This project reflects my commitment to clean, scalable front-end solutions and ongoing learning through hands-on development.',
        openButtonLabel: 'More information',
        link: {
            id: Project.EFD,
            path: 'https://dck5132.github.io/EFD/',
            label: 'Escape From Decisions'
        }
    },
];