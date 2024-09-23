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
    //this.router.navigate(['/pricing'])
    this.router.navigate(['/main']);
  }

}
