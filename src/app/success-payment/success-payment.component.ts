import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.css']
})
export class SuccessPaymentComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  navigateToMain(){
    let url1 
     url1  = localStorage.getItem('url');
     if(url1 && url1.includes('/sc')){
      this.router.navigate(['/SC']);
     }else{
      this.router.navigate(['/']);
     }
 
   // this.router.navigate(['/main']);
  }

}
