import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
  }

    // jQuery('.back-btn').on('click', function() {
    //   window.history.back();
    //   return false;
    // });



  navigateToCompany() {
    this.router.navigate(['/company']).then(()=> {
      // window.location.reload();
    })
  }  
  
  navigateToPayItForward() {
    this.router.navigate(['/pay-it-forward']).then(()=> {
        // window.location.reload();
      })
  }

  navigateToPress(){
    this.router.navigate(['/press'])
  }

  navigateToAcademicIntegrity(){
    this.router.navigate(['/academic-integrity']);
  }

  navigateToBlog(){
    this.router.navigate(['/blog']);
  }
  
  navigateToInvestor(){
    this.router.navigate(['/investors']);
  }
  
  navigateToSafety() {
    this.router.navigate(['/safety']).then(()=> {
      // window.location.reload();
    })
  }    
  navigateToMain(){
    this.router.navigate(['/main']);
  }

  navigateToLabs() {
    this.router.navigate(['/labs']).then(()=> {
      // window.location.reload();
    })
  }
}