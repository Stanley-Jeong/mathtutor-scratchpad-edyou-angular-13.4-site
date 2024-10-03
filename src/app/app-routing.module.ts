import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
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
import { InvestorLoginComponent } from './investor-login/investor-login.component';
import { CoursePageComponent } from './courses-page/course.component'
import { SuccessPaymentComponent } from './success-payment/success-payment.component';
import { ScComponent } from './sc/sc.component';
import { ScRedirectGuard } from './sc-redirect.guard';
import { SuccesspaymentComponent } from './successpayment/successpayment.component';
import { FailedpaymentComponent } from './failedpayment/failedpayment.component';
import { ProfileComponent } from './profile/profile.component';
import { NewletterComponent } from './newletter/newletter.component';
import { ConsentsuccessComponent } from './consentsuccess/consentsuccess.component';
import { CourseScComponent } from './course-sc/course-sc.component';


const routes: Routes = [


  {path:'', redirectTo:'/', pathMatch:'full'},
  {path:'', component: MainComponent},
  {path: 'company', component: CompanyComponent},
  { path: 'company#mission-vision', component: CompanyComponent },
  {path: 'pay-it-forward', component:PayItForwardComponent},
  {path: 'press', component:PressComponent},
  {path: 'safety',  component:SafetyComponent},
  {path: 'SC', component: ScComponent },
  { path: 'sc', redirectTo: 'SC', pathMatch: 'full' },
  {path: 'profile', component:ProfileComponent},
  {path: 'SC/profile', component:ProfileComponent},
  //{path: 'sc', component: ScComponent ,canActivate: [ScRedirectGuard]},
  {path: 'academic-integrity', component:AcademicIntegrityComponent},
  {path: 'labs', component: LabsComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'investors', component: InvestorsComponent},
  {path: 'terms', component:TermsComponent},
  {path: 'privacy', component:PrivacyComponent},
  {path: 'payment-success', component:SuccessPaymentComponent},
  {path: 'how-edyous-ai-is-reimagining-the-future-of-personalized-learning', component:EdyousAiComponent},
  {path:'revolutionizing-education-with-edyou-bridging-the-post-pandemic-learning-gap', component:RevolutionizingEducationComponent},
  {path:'investorLogin', component:InvestorLoginComponent},
  {path: 'us-history', component:CoursePageComponent},
  {path: 'sc/sc-us-history', component:CourseScComponent},
  {path: 'sc/sc-algebra', component:CourseScComponent},
  {path: 'sc/sc-pre-algebra', component:CourseScComponent},
  {path: 'sc/sc-latin', component:CourseScComponent},
  {path: 'sc/sc-biology', component:CourseScComponent},
  {path: 'algebra', component:CoursePageComponent},
  {path: 'english', component:CoursePageComponent},
  {path: 'leadership', component:CoursePageComponent},
  {path: 'communications', component:CoursePageComponent},
  {path: 'entrepreneurship', component:CoursePageComponent},
  {path: 'artificial-intelligence', component:CoursePageComponent},
  {path: 'computer-science', component:CoursePageComponent},
  {path: 'project-management', component:CoursePageComponent},
  {path: 'Cardiology', component:CoursePageComponent},
  {path: 'Endocrinology', component:CoursePageComponent},
  {path: 'Gastroenterology', component:CoursePageComponent},
  {path: 'Intro-to-Internal-Medicine', component:CoursePageComponent},
  {path: 'Geriatric-Medicine', component:CoursePageComponent},
  {path: 'Hematology-and-Oncology', component:CoursePageComponent},
  {path: 'Infectious-Diseases', component:CoursePageComponent},
  {path: 'Nephrology', component:CoursePageComponent},
  {path: 'Intro-to-Neurology', component:CoursePageComponent},
  {path: 'Pulmonary-and-Critical-Care-Medicine', component:CoursePageComponent},
  {path: 'Rheumatology', component:CoursePageComponent},
  {path: 'Intro to Family Medicine', component:CoursePageComponent},
  {path: 'Intro-to-Surgery', component:CoursePageComponent},
  {path: 'Intro-to-Obstetrics/Gynaecology', component:CoursePageComponent},
  {path: 'Intro-to-Pediatrics', component:CoursePageComponent},
  {path: 'Intro-to-Psychiatry', component:CoursePageComponent},
  {path: 'USMLE Step 1', component:CoursePageComponent},
  {path: 'USMLE Step 2', component:CoursePageComponent},
  {path: 'USMLE Step 3', component:CoursePageComponent},
  {path: 'Toxicology', component:CoursePageComponent},
  {path: 'Neurology', component:CoursePageComponent},
  {path: 'Sexually-Transmitted-Diseases', component:CoursePageComponent},
  {path: 'Heart Failure', component:CoursePageComponent},
  {path: 'Toxicology', component:CoursePageComponent},
  {path: 'Patient-Care', component:CoursePageComponent},
  {path: 'Medical-Knowledge', component:CoursePageComponent},
  {path: 'Radiology', component:CoursePageComponent},
  {path: 'Outcomes-Ethics', component:CoursePageComponent},
  {path: 'Neuroscience', component:CoursePageComponent},
  {path: 'Clinical Neuro/Psych', component:CoursePageComponent},
  {path: 'Behavioral/Social Science', component:CoursePageComponent},
  {path: 'Issues-in-Practice', component:CoursePageComponent},
  {path: 'Mathematics', component:CoursePageComponent},
  {path: 'Biology', component:CoursePageComponent},
  {path: 'Poetry', component:CoursePageComponent},
  {path: 'Writing', component:CoursePageComponent},
  {path: 'Word-Problems', component:CoursePageComponent},
  {path: 'Pre-Algebra', component:CoursePageComponent},
  {path: 'Politics', component:CoursePageComponent},
  {path: 'Interview Prep', component:CoursePageComponent},
  {path: 'Bully Help', component:CoursePageComponent},
  {path: 'Accent Reduction', component:CoursePageComponent},
  {path: 'Conflict Resolution', component:CoursePageComponent},
  {path: 'Time-Management', component:CoursePageComponent},
  {path: 'Self-Care', component:CoursePageComponent},
  {path: 'Test-prep', component:CoursePageComponent},
  {path: 'sc/payment-success', component:SuccesspaymentComponent},
  {path: 'newsletter-success', component:NewletterComponent},
  {path: 'payment-failed', component:FailedpaymentComponent},
  {path: 'sc/payment-failed', component:FailedpaymentComponent},
  {path: 'consentsuccess', component:ConsentsuccessComponent},
  {path: '**', redirectTo: '/'},
  
];




@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
   
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
