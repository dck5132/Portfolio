//Constants and Enums
import {
    Degree,
    Name
} from "../../../shared/constants/information.constants";
import { JobTitle, Project } from "../../../shared/constants/information.enums";
import { ResumeTitle } from "./resume.enums";
// Interfaces
import { ResumeInfo } from "../interfaces/resume.interfaces";

export const ResumeContent: ResumeInfo[] = [
    {
        id: ResumeTitle.SUMMARY,
        title: ResumeTitle.SUMMARY,
        name: Name,
        description: 'Driven Front-End Developer with 9 years of experience building responsive, efficient, and scalable web applications in regulated environments. Proven success optimizing performance, modernizing codebases, and streamlining deployment workflows. Combines technical precision with a collaborative mindset to deliver seamless user experiences and measurable business value.',
    },
    {
        id: `${ResumeTitle.PROFESSIONAL_EXPERIENCE}-${Project.EXPERIAN}`,
        title: ResumeTitle.PROFESSIONAL_EXPERIENCE,
        name: JobTitle.SOFTWARE_ENGINEER,
        timePeriod: '2021 - 2025',
        location: Project.EXPERIAN,
        details: [
            'Decreased domain page load time overall by 0.25 seconds through performance optimization.',
            'Refactored key components, reducing technical debt and codebase size by 12%.',
            'Increased unit test coverage by 26% and accessibility compliance by 10% (WCAG standards).',
            'Migrated a core feature to micro front-end architecture improving performance by 15%',
            'Streamlined API migration process to address inefficiencies cutting transition time by 3 days.',
        ]
    },
    {
        id: `${ResumeTitle.PROFESSIONAL_EXPERIENCE}-${Project.AMSTED_DIGITAL}`,
        name: JobTitle.WEB_DEVELOPER,
        timePeriod: '2017 - 2021',
        location: Project.AMSTED_DIGITAL,
        details: [
            'Implemented interactive, dynamic user interfaces across 18 web pages, significantly enhancing user engagement and experience.',
            'Upgraded SPA through 8 Angular versions, refactoring the codebase each cycle to support growing user demands, enhancing scalability and improving performance by 25%.',
            'Orchestrated front-end production deployments in close coordination with backend teams, ensuring seamless releases and reducing deployment time by 20%.'
        ]
    },
    {
        id: `${ResumeTitle.PROFESSIONAL_EXPERIENCE}-${Project.KNOWLEDGENT}`,
        name: JobTitle.WEB_DEVELOPER,
        timePeriod: '2016 - 2017',
        location: Project.KNOWLEDGENT,
        details: [
            'Improved website performance and usability by 8% through implementation of best practices',
            'Optimized critical analytical reports, reducing compilation time by 16%, while increasing the degree of detail to assist with strategic decision making.'
        ]
    },
    {
        id: `${ResumeTitle.PROFESSIONAL_EXPERIENCE}-${Project.EVERGLADES_TECHNOLOGIES}`,
        name: JobTitle.INTERN_AND_FREELANCE_DEVELOPER,
        timePeriod: '2015 - 2015',
        location: Project.EVERGLADES_TECHNOLOGIES,
        details: [
            'Designed and implemented meeting room cost estimation form that boosted conversion metrics by 10%',
            'Developed mobile friendly scalable web application to track clients web connectivity by pinging IP addresses and displaying them via Google Maps API connected to a MySQL database.'
        ]
    },
    {
        id: ResumeTitle.EDUCATION,
        title: ResumeTitle.EDUCATION,
        name: Degree,
        timePeriod: '2012 - 2016',
        location: 'The Pennsylvania State University',
        description: `I graduated from The Pennsylvania State University with a ${Degree} in Information Sciences and Technology. During my time here I was a founding member of the Berks Billiards Club and honed my organization, communication and leadership skills there.`,
        details: [
            'Co founder and vice president of Berks Billiards Club in sophomore year.',
            'President of Berks Billiards Club from junior year to graduation.'
        ]
    },
];

export const ResumeLeftSideTitles = [ResumeTitle.SUMMARY, ResumeTitle.PROFESSIONAL_EXPERIENCE];
export const ResumeRightSideLocations = [Project.KNOWLEDGENT, Project.EVERGLADES_TECHNOLOGIES];
