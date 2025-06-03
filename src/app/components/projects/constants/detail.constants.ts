// Interfaces
import { DetailedInformation } from "../interfaces/detail.interfaces";
// Constants and Enums
import { Project } from "../../../shared/constants/information.enums";

export const PositionDetails: DetailedInformation[] = [
    {
        project: Project.EXPERIAN,
        heading: 'Regulatory Domain',
        description: 'Worked across critical regulatory features including Security Freeze, Credit Lock, Disputes, Annual Credit Report, and Fraud Alerts. Ensured compliance and created a seamless user experience through thoughtful, scalable front-end development.'
    },
    {
        project: Project.EXPERIAN,
        heading: 'Security Freeze',
        description: 'Developed and optimized a large part of the Security Freeze functionality, including a major API migration effort. Enhanced performance, maintainability, and integration across the platform.'
    },
    {
        project: Project.EXPERIAN,
        heading: 'Credit Lock',
        description: 'Refactored and maintained the Credit Lock page, resolving high-impact bugs and improving code quality to align with regulatory standards and performance goals.'
    },
    {
        project: Project.EXPERIAN,
        heading: 'Disputes',
        description: 'Migrated the Dispute page to a micro front-end architecture. Improved modularity and system performance while enabling more scalable feature development. Developed several new features in the Dispute page and improved unit test coverage significantly.'
    },
    {
        project: Project.EXPERIAN,
        heading: 'Annual Credit Report',
        description: 'Revamped accessibility for the Annual Credit Report in line with WCAG guidelines. Improved screen reader compatibility and ensured inclusive user navigation.'
    },
    {
        project: Project.AMSTED_DIGITAL,
        heading: 'Front-End Developer',
        description: 'Built robust UI features for tracking freight car data such as ETAs, sensor metrics, geofences, and regulatory forms. Led initial migration towards a CI/CD pipeline with Azure and collaborated closely with API and database teams for streamlined deployments.'
    },
    {
        project: Project.AMSTED_DIGITAL,
        heading: 'Data Visualization',
        description: 'Created interactive data visualizations using Google Maps, AG Grid, and Highcharts. Integrated REST APIs to deliver real-time, filterable insights for logistics tracking.'
    },
    {
        project: Project.AMSTED_DIGITAL,
        heading: 'Angular Migration',
        description: 'Upgraded the single-page application through eight Angular versions. Refactored codebase each cycle to align with latest best practices, resulting in smoother performance and improved user experience.'
    },
    {
        project: Project.AMSTED_DIGITAL,
        heading: 'OAuth & JWT Authentication',
        description: 'Implemented secure access control using OAuth and JWT. Ensured only authorized users could access key features reinforcing data protection and user trust.'
    },
    {
        project: Project.KNOWLEDGENT,
        heading: 'Web Developer',
        description: 'Maintained and enhanced the internal company website, updated critical analytical reports, and supported IT operations with hardware/software troubleshooting and setup.'
    },
    {
        project: Project.KNOWLEDGENT,
        heading: 'Analytical Reports Optimization',
        description: 'Improved performance of business-critical reports, reducing load time by 25% and increasing data granularity to better support strategic decision-making.'
    },
    {
        project: Project.KNOWLEDGENT,
        heading: 'Internal Website Enhancements',
        description: 'Refactored existing code for better maintainability and added new features as needed. Focused on upholding high code quality standards and long-term scalability.'
    },
    {
        project: Project.KNOWLEDGENT,
        heading: 'IT Support & Troubleshooting',
        description: 'Provided hands-on support for hardware and software issues across departments. Diagnosed technical problems quickly and ensured smooth onboarding with new device setups.'
    },
    {
        project: Project.KNOWLEDGENT,
        heading: 'Self-Learning: Angular',
        description: 'Proactively self-taught Angular during spare time to expand front-end development skills and strengthen modern web development expertise.'
    },
    {
        project: Project.EVERGLADES_TECHNOLOGIES,
        heading: 'Freelance Web Developer / Intern',
        description: 'Designed and built web tools to enhance client services and internal sales processes. Developed an IP tracking dashboard using Google Maps to monitor internet connectivity disruptions and a dynamic cost estimation tool to assist clients in planning meeting room installations which improved both user experience and conversion rates.'
    },
    {
        project: Project.EVERGLADES_TECHNOLOGIES,
        heading: 'Client IP Tracking Dashboard',
        description: 'Engineered a recursive SQL-based tracking system to monitor real-time client internet status changes. Visualized connectivity disruptions on an interactive Google Map embedded in the application.'
    },
    {
        project: Project.EVERGLADES_TECHNOLOGIES,
        heading: 'Meeting Room Cost Estimation Tool',
        description: 'Created a user-friendly web form to estimate construction and furnishing costs for client meeting rooms. Streamlined the inquiry process and supported sales conversations with immediate, tailored insights.'
    },
    {
        project: Project.EVERGLADES_TECHNOLOGIES,
        heading: 'Remote Collaboration & Innovation',
        description: 'Successfully worked in a remote environment, maintaining clear communication and delivering innovative technical solutions independently.'
    },
    {
        project: Project.EFD,
        heading: 'Escape From Decision (EFD)',
        description: 'Built a lightweight utility app to solve a recurring problem in Escape From Tarkov, removing the friction of choosing a map or raid time. The app delivers quick, randomized selections to improve gameplay experience.'
    },
    {
        project: Project.EFD,
        heading: 'Angular Migration & Maintenance',
        description: 'Started on Angular v12 and progressively upgraded through Angular v19. Each migration focused on performance, compatibility, and aligning with the latest Angular best practices.'
    },
    {
        project: Project.EFD,
        heading: 'Robust Unit Testing',
        description: 'Implemented comprehensive unit tests to cover all critical features. This test first approach ensures long-term reliability and minimizes regressions during updates or refactoring.'
    },
    {
        project: Project.EFD,
        heading: 'Key Takeaways',
        description: 'Reinforced key engineering principles:',
        bulletPoints: [
            'Declarative programming results in cleaner, more maintainable code.',
            'Investing in testing early reduces the amount of time spent debugging later.',
            'There is no need to reinvent the wheel if a suitable alternative is easily available.',
        ]
    },
];

export const primaryTechnologies = [
    {
        project: Project.EXPERIAN,
        tech: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Node', 'Storybook', 'Jasmine/Karma', 'AWS', 'Github Actions']
    },
    {
        project: Project.AMSTED_DIGITAL,
        tech: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Node', 'Azure', 'Highcharts', 'Google Maps API', 'AG-Grid', 'Bootstrap', 'Jasmine/Karma', 'Google Analytics', 'Azure']
    },
    {
        project: Project.KNOWLEDGENT,
        tech: ['JavaScript', 'PHP', 'SQL', 'HTML', 'CSS']
    },
    {
        project: Project.EVERGLADES_TECHNOLOGIES,
        tech: ['JavaScript', 'PHP', 'SQL', 'AJAX', 'HTML', 'CSS']
    },
    {
        project: Project.EFD,
        tech: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Highcharts', 'Angular Material', 'Bootstrap', 'Github Pages']
    }
];