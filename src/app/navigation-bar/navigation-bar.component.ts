import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  animations: [
    trigger('slideDownUp', [
      state('visible', style({
        height: '100%'
      })),
      transition(':enter', [
        style({
          height: '0'
        }),
        animate('0.3s ease')
      ]),
      transition(':leave', [
        animate('0.3s ease', style({
          height: '0'
        }))
      ])
    ])
  ]
})
export class NavigationBarComponent implements OnInit {

  constructor(
    private router: Router
  ){}

  isVisible:boolean = false;

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

  // showNavigation(){
  //   this.isVisible=true;

  //   const targetDiv = document.getElementById('targetDiv');

  //   // Modify the CSS properties based on visibility state
  //   if (targetDiv) {
  //     // alert("working fine..........................................................................");
  //     targetDiv.style.display = 'block'; // Make the div visible
  //     targetDiv.style.position = 'fixed'; // Set position to fixed to overlay all elements
  //     targetDiv.style.top = '0'; // Position from the top of the viewport
  //     targetDiv.style.left = '0'; // Position from the left of the viewport
  //     targetDiv.style.width = '100%'; // Cover the entire width
  //     targetDiv.style.height = '100%'; // Cover the entire height
  //     targetDiv.style.overflow ='hidden';
  //     targetDiv.style.zIndex = '5';
  //     targetDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black background
  //     // Add any other CSS properties as needed
  //   }
  // }

  showNavigation(): void {
    const targetDiv = document.getElementById('targetDiv');
    if(targetDiv){
      targetDiv.style.height = '100%';
    }
  }

  hideNavigation(): void {
    const targetDiv = document.getElementById('targetDiv');
    if(targetDiv){
      targetDiv.style.height = '0';
    }
  }
}