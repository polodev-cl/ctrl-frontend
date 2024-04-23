/// <reference types="@angular/localize" />

import { bootstrapApplication } from "@angular/platform-browser";
import { Amplify } from 'aws-amplify';

import config from './amplifyconfiguration.json';
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

Amplify.configure(config);


bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
