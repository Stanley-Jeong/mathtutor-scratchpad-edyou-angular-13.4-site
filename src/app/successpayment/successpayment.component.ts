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
  subscribedata: any;
  loggedInDaTa: any;
  
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

  login() {
    
      let loginPayload = {
        "email": this.user.email,
        "password": this.user.password,
      }
     
      this.service.signIn(loginPayload).subscribe(
        (data: any) => {
          if (data.statusCode == 200) {
        
            localStorage.setItem("url", JSON.stringify(data.url));
            localStorage.setItem("user", JSON.stringify(data.body))
           localStorage.setItem("user", JSON.stringify(data.body));
           localStorage.setItem("LoginState", JSON.stringify(true));
           localStorage.setItem("email",data.body.email);
         
            //localStorage.setItem("subscription", JSON.stringify(data));
        
          
          
            
           
         
            let payload ={
              "request": "get_customer_product",
             "customer_id": data.body.cus_id
            }
            
            this.service.getSubscriptionDetail(payload).subscribe((res: any) => {
             if(res.statusCode == 200){
             
            this.subscribedata = res.body
          //  this.service.setSubscriptionData(this.subscribedata);
            localStorage.setItem("subscription", JSON.stringify(this.subscribedata));
            }else{
              //localStorage.removeItem("subscription");
              this.subscribedata = ''
              console.log('no data')
              localStorage.removeItem("subscription");
            }
          } )
          
          //  localStorage.setItem("subscription", JSON.stringify(res.body));
          //  console.log(this.loggedInDaTa)
            if (this.loggedInDaTa.url.includes('/sc')) {
              console.log('URL contains /sc',this.loggedInDaTa.url);
              this.router.navigate(['/SC']);
              localStorage.setItem("Login_User", JSON.stringify('SC'));
              // Perform any logic if needed
            } else {
              console.log('URL does not contain /sc');
              localStorage.setItem("Login_User", JSON.stringify('B2C'));
              this.router.navigate(['/']);
            }
          

         
          }
        
        })
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
  let url1 
     url1  = localStorage.getItem('url');
     if(url1 && url1.includes('/sc')){
      this.router.navigate(['/SC']);
      
     }else{
      this.router.navigate(['/']);
     }
 
}
}