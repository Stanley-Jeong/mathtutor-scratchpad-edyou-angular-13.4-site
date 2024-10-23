import { APP_INITIALIZER, ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
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
import { ExtraOptions, Router, RouterModule } from "@angular/router"; // <-- Add RouterModule
import * as Sentry from "@sentry/angular-ivy";
import { CommonModule } from '@angular/common';
import { CoursePageComponent } from './courses-page/course.component';
import { ScComponent } from './sc/sc.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CourseScComponent } from './course-sc/course-sc.component';
 // Import the datepicker module
 

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled', // Enable fragment scrolling
  scrollPositionRestoration: 'enabled', // Restore scroll position on navigation
};

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    CoursePageComponent,
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
    ScComponent,
    LoginComponent,
    ProfileComponent,
    CourseScComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule.forRoot([], routerOptions), // <-- Add RouterModule with routerOptions
    CommonModule ,
    FormsModule,
    ReactiveFormsModule,
    
   
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(trace: Sentry.TraceService) {}
}
