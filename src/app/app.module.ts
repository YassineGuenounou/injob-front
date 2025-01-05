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
import { JobsOffersEffects } from './store/effects/job-offers.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({ jobOffers: jobOffersReducers }),
    EffectsModule.forRoot([JobsOffersEffects]),
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
export class AppModule {}
