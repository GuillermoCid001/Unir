
import { AppComponent } from './app/app'; 

import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';


bootstrapApplication(AppComponent)
  .catch(err => console.error(err));