import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-failedpayment',
  templateUrl: './failedpayment.component.html',
  styleUrls: ['./failedpayment.component.css']
})
export class FailedpaymentComponent implements OnInit {
  

  constructor(private route: ActivatedRoute,private service:UserService, private router:Router) { }

  plan: string | null = '';
  amount: string | null = '';
  purchase: string | null = '';
  user: any;
  Url: any;
  subscribedata: any;
  loggedInDaTa: any;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    this.plan = this.route.snapshot.queryParamMap.get('plan');
    this.amount = this.route.snapshot.queryParamMap.get('amount');
    this.purchase = this.route.snapshot.queryParamMap.get('purchase');
 
    this.login();
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
          this.service.setSubscriptionData(this.subscribedata);
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

  navigateTOPricing(){
    let url1 
    url1  = localStorage.getItem('url');
    if(url1 && url1.includes('/sc')){
     this.router.navigate(['/SC']);
    }else{
     this.router.navigate(['/']);
    }

    //this.router.navigate(['/main']);
  }

}
