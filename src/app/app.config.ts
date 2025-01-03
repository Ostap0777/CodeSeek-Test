import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Router } from 'express';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
	provideRouter(routes), 
	provideClientHydration(withEventReplay()),
	CommonModule, 
	ReactiveFormsModule,
	FormsModule, provideAnimationsAsync(),
	MatDialogModule,
	
 ]
};
