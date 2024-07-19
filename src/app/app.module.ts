import {APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser'

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { UneeqavatarComponent } from './uneeqavatar/uneeqavatar.component';
import { CompanyComponent } from './company/company.component';
import { PayItForwardComponent } from './pay-it-forward/pay-it-forward.component';
import { PressComponent } from './press/press.component';
import { SafetyComponent } from './safety/safety.component';
import { AcademicIntegrityComponent } from './academic-integrity/academic-integrity.component';
import { LabsComponent } from './labs/labs.component';
import { BlogComponent } from './blog/blog.component';
import { InvestorsComponent } from './investors/investors.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { EdyousAiComponent } from './edyous-ai/edyous-ai.component';
import { RevolutionizingEducationComponent } from './revolutionizing-education/revolutionizing-education.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvestorLoginComponent } from './investor-login/investor-login.component';
import { Router } from "@angular/router";
import * as Sentry from "@sentry/angular-ivy";


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FooterComponent,
    MainComponent,
    UneeqavatarComponent,
    CompanyComponent,
    PayItForwardComponent,
    PressComponent,
    SafetyComponent,
    AcademicIntegrityComponent,
    LabsComponent,
    BlogComponent,
    InvestorsComponent,
    TermsComponent,
    PrivacyComponent,
    EdyousAiComponent,
    RevolutionizingEducationComponent,
    InvestorLoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [{
    provide: ErrorHandler,
    useValue: Sentry.createErrorHandler({
      showDialog: false,
    }),
  }, {
    provide: Sentry.TraceService,
    deps: [Router],
  },
  {
    provide: APP_INITIALIZER,
    useFactory: () => () => {},
    deps: [Sentry.TraceService],
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(trace: Sentry.TraceService) {}
}
