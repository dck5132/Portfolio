import { Routes } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';

// Constants and Enums
import { InternalPaths } from './shared/constants/routing.enums';

export const routes: Routes = [
    {
        path: InternalPaths.HOME,
        component: HomeComponent
    },
    { 
        path: '**',
        redirectTo: InternalPaths.HOME,
        pathMatch: 'full' 
    }
];
