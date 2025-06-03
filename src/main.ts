import { bootstrapApplication } from '@angular/platform-browser';
// Swiper Web Element
import { register } from 'swiper/element/bundle';
register();
// Configs
import { appConfig } from './app/app.config';
// Components
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
