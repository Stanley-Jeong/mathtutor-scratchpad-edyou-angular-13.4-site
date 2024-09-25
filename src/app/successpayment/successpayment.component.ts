import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-successpayment',
  templateUrl: './successpayment.component.html',
  styleUrls: ['./successpayment.component.css']
})
export class SuccesspaymentComponent implements OnInit {

  plan: string | null = '';
  amount: string | null = '';
  purchase: string | null = '';
  user: any;
  Url: any;
  
  constructor(private route: ActivatedRoute,private service:UserService, private router:Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    this.plan = this.route.snapshot.queryParamMap.get('plan');
    this.amount = this.route.snapshot.queryParamMap.get('amount');
    this.purchase = this.route.snapshot.queryParamMap.get('purchase');
 
     if(this.purchase){
   //   this.signUp()
      this.invoiceCheck()
     }
    console.log('Plan:', this.plan);
    console.log('Amount:', this.amount);
    console.log('Purchase:', this.purchase);
  }


  signUp() {

      let loginPayload = {
        "email": this.user.email,
        "f_name": this.user.f_name,
        "l_name": this.user.l_name,
        "password": this.user.password,
        'dob': this.user.date,
        "tenantName": "Sierra Canyon",
        "purchase": this.purchase,
        "grade": "Grade 6"
      }
     // this.isLoading2 = true
      this.service.signUp(loginPayload).subscribe(
        (data: any) => {
          if (data.statusCode == 200) {
        //    this.isLoading2 = false

            //  this.showMessage = data.body

           // this.isSignUpFormSubmit = true
            // setTimeout(() => {
            //   this.showMessage = '' 
            // //  this.signInFun()
            // }, 4000)
          }

        })
 
  }


  invoiceCheck(){
    let loginPayload = {
      "email": this.user.email,
      
    }
   
    this.service.getInvoice(loginPayload).subscribe((res:any)=> {
      if (res.statusCode == 200) {
        this.Url = res.url
      
      }
    })
  }


downloadInvoice() {
  const link = document.createElement('a');
  link.href = this.Url;
  link.download = 'invoice.pdf'; // You can change the filename here
  link.click();
}

navigateToMain() {
  // this.router.navigate(['/SC']);
  this.router.navigate(['/main']);
}
}