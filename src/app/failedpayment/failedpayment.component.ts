import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-failedpayment',
  templateUrl: './failedpayment.component.html',
  styleUrls: ['./failedpayment.component.css']
})
export class FailedpaymentComponent implements OnInit {
  

  constructor(private router:Router) { }

  ngOnInit(): void {
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
