/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Amplify } from 'aws-amplify';

import config from './amplifyconfiguration.json'; 

Amplify.configure(config);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
