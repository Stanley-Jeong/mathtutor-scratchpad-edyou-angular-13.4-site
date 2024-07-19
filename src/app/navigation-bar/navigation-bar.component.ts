import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
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
export class NavigationBarComponent implements OnInit ,OnDestroy {
  scrollKey: any;
  private isBrowser: boolean;
  constructor(
    private router: Router,private service : ColorChangeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ){this.isBrowser = isPlatformBrowser(this.platformId);}

  isVisible:boolean = false;

  ngOnInit(): void {}

  navigateToCompany() {
    this.router.navigate(['/company']).then(()=> {
    })
  }  
  
  navigateToPayItForward() {
    this.router.navigate(['/pay-it-forward']).then(()=> {})
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
    })
  }    
  navigateToMain(){
    this.router.navigate(['/main']);
  }

  navigateToLabs() {
    this.router.navigate(['/labs']).then(()=> {
    })
  }


  showNavigation(){
    if(this.isBrowser) {
    const targetDiv = document.getElementById('targetDiv');
    if(targetDiv){
      targetDiv.style.minHeight='100vh';
      targetDiv.style.maxHeight = '100vh';
    }
    }
  }

  hideNavigation(){
    if(this.isBrowser) {
    const targetDiv = document.getElementById('targetDiv');
    if(targetDiv){
      targetDiv.style.minHeight ='0';
      targetDiv.style.maxHeight = '0';
    }
  }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
    }
  }
  
}