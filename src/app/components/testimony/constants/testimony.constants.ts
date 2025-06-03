import { Project } from "../../../shared/constants/information.enums";
import { Testimonial } from "../interfaces/testimony.interfaces";

export const Recommendations: Testimonial[] = [
    {
      author: 'Philip W. Kaso',
      position: 'Senior Product Manager/Product Owner, CSPO',
      relativePosition: 'Worked on same team',
      company: Project.EXPERIAN,
      testimony: [
            'I had the pleasure of working with Cyril Kalikin at Experian Consumer Services for the past four years on the multi-year "NIKE2" project, which aimed to bring the Fair Credit Reporting Act (FCRA) features of Credit Freeze, Fraud Alerts, and Credit Disputes into a modern, direct-to-customer (D2C) experience. As an Angular web developer on my frontend development team, Cyril\'s performance and professionalism were always superb. He was what I considered my "go-to frontend developer.',
            'Specifically Cyril:',
            '- Developed user-facing features in the regulatory domain of our customer-facing website.',
            '- Utilized the Angular framework, TypeScript, JavaScript, Sass, HTML, Git, Node.js in a micro front-end architecture.',
            '- Added new unit tests and updated existing unit tests as part of development to increase code test coverage and ensure that new and existing functionality did not break.',
            `- Improved the site's accessibility by utilizing plugins to test and update the code, ensuring it met the specified requirements.`,
            '- Debugged existing code to reduce the number of bugs and known issues, ensuring the maintainability of the website.',
            '- Collaborated across domains and committed updates to multiple repositories on the customer-facing website.',
            '- Optimized the existing codebase to ensure it is more readable, scalable, and performant.',
            'As the Lead Product Manager for the "NIKE2" project, I worked closely with Cyril on a daily basis. He consistently showed up ready to work, collaborate, and overcome numerous roadblocks in a heavily regulated space. I can and do wholeheartedly recommend Cyril. If you are looking for an Angular front-end developer, you don\'t need to look any further.'
        ]
    },
    {
        author: 'Ruben Piatnitsky',
        position: 'Software Engineer',
        relativePosition: 'Worked on same team',
        company: Project.EXPERIAN,
        testimony: [
            'I\'m delighted to recommend Cyril, a talented front-end engineer who I\'ve had the pleasure of working with at Experian. Over the past 2.5 years, we\'ve collaborated on the regulatory parts of the Experian web application, and I\'ve seen firsthand his exceptional skills and expertise.',
            'Cyril\'s in-depth knowledge of the Angular framework and business domain made our design discussion sessions flow easily. He\'s a strong advocate for best practices and has a keen eye for detail, which has helped to improve the quality of our codebase. His daily code reviews were always insightful and helpful, and his contributions to team discussions were thoughtful and engaging.',
            'What sets Cyril apart is his easy-going, yet professional character. He\'s a pleasure to work with, and his positive attitude and strong work ethic make him a valuable asset to any team.'
        ]
    },
    {
        author: 'Danika Quinteros',
        position: 'Senior Software Engineer',
        relativePosition: 'Worked on different team',
        company: Project.EXPERIAN,
        testimony: [
            'Although Cyril and I were on different teams at Experian, we had the opportunity to collaborate on several projects - most notably during his leadership of a key API transition that impacted multiple teams. He spearheaded the migration to a more centralized API, which significantly improved alignment and integration across applications.',
            'Cyril approached the transition with thoughtful planning, breaking the process into clear, manageable steps. This not only simplified implementation for all involved but also ensured each phase was thoroughly validated before moving to the next step. He was always readily available to answer questions and offered clear, practical guidance that made transitioning to the new api seamless.',
            `Cyril's technical leadership, clarity in communication, and collaborative mindset made a strong impression. He's a great asset to any team driving complex, cross-functional initiatives.`
        ]
    }
  ];