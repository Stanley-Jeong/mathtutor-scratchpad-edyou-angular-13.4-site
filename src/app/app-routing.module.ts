import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CompanyComponent } from './company/company.component';
import { PayItForwardComponent } from './pay-it-forward/pay-it-forward.component';
import { PressComponent } from './press/press.component';
import { SafetyComponent } from './safety/safety.component';
import { AcademicIntegrityComponent } from './academic-integrity/academic-integrity.component';
import { LabsComponent } from './labs/labs.component';
import { BlogComponent } from './blog/blog.component';
import { InvestorsComponent } from './investors/investors.component';



const routes: Routes = [

  {path:'', redirectTo:'/main', pathMatch:'full'},
  {path:'main', component: MainComponent},
  {path: 'company', component: CompanyComponent},
  { path: 'company#mission-vision', component: CompanyComponent },



  {path: 'pay-it-forward', component:PayItForwardComponent},
  {path: 'press', component:PressComponent},
  {path: 'safety', component: SafetyComponent },
  {path: 'academic-integrity', component:AcademicIntegrityComponent},
  {path: 'labs', component: LabsComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'investors', component: InvestorsComponent}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
