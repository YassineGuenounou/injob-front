import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializer } from './utility/app.init';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/shared.module';
import { StoreModule } from '@ngrx/store';
import { jobOffersReducers } from './store/reducers/job-offers.reducers';
import { EffectsModule } from '@ngrx/effects';
import { JobOffersEffects } from './store/effects/job-offers.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { jobApplicationsReducers } from './store/reducers/job-applications.reducers';
import { JobApplicationsEffects } from './store/effects/job-applications.effects';
import { interviewsReducers } from './store/reducers/interviews.reducers';
import { InterviewsEffects } from './store/effects/interviews.effects';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({ jobOffers: jobOffersReducers, jobApplications: jobApplicationsReducers, interviews: interviewsReducers }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false,
      },
    }),
    EffectsModule.forRoot([JobOffersEffects, JobApplicationsEffects, InterviewsEffects]),
    StoreDevtoolsModule.instrument({
      name: 'InJob',
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [KeycloakService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
