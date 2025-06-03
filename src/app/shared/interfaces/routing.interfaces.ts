import { IconDefinition } from "@fortawesome/angular-fontawesome";

// Used for Internal/External Links
export interface Links {
    icon?: IconDefinition;
    id: string;
    label?: string;
    path: string;
}
