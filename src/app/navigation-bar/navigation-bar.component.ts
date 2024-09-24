import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';
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
  screenSize: string ='large';
  isSafetyState = false; 
  currentUrl: string ='url';
  isScPage: boolean =false;
  sc: boolean= false;

  constructor(
    private router: Router, private service : ColorChangeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ){this.isBrowser = isPlatformBrowser(this.platformId);}

  isVisible:boolean = false;
  defaultImage: string = '../assets/icons/twitter-grey.png'; // Path to your default image
  hoverImage: string = '../assets/icons/twitter-blue.png'; // Path to your hover image
  isHovered: boolean = false;
  ngOnInit(): void {
    const width = window.innerWidth;
    if (width < 1024) {
      this.screenSize = 'small'; // Mobile
    } else {
      this.screenSize = 'large'; // Desktop
    }
  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Navigation is starting
        this.currentUrl = this.router.url;
       // console.log('Current URL before navigation starts:', this.currentUrl);
        this.hideNavigation()
      }
      if (event instanceof NavigationEnd) {
        // Navigation is starting
        this.currentUrl = this.router.url;
     
          // Check if the URL contains '/safety'
       if(this.router.url.includes('/safety')||this.router.url.includes('/terms')||this.router.url.includes('/privacy')){
        this.isSafetyState = true;
      //  console.log('u')
          }else{
            this.isSafetyState = false;
          }
          if(this.router.url.includes('/SC')||this.router.url.includes('/sc')){
             this.isScPage =true;
           if(this.screenSize == 'small')  {
          this.sc = true;  
           }else{
            this.sc = false;
           }
          }else{
            if(this.screenSize == 'small')  {
              this.sc = false;  
               }
            this.isScPage =false;
            this.sc = false;
          }
        
     //   console.log('Current URL before navigation starts:', this.currentUrl,this.isSafetyState);
        this.hideNavigation()
      }
    });
 
  
    // console.log(width)
    // if (width < 1024) {
    //   this.screenSize = 'small'; // Mobile
    // } else {
    //   this.screenSize = 'large'; // Desktop
    // }
  }
  onMouseOver(): void {
    this.isHovered = true;
  }

  onMouseOut(): void {
    this.isHovered = false;
  }
  navigateToCompany() {
    this.router.navigate(['/company']).then(()=> {
    })
  }  
  navigateToSC() {
    this.router.navigate(['/SC']);
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

  // scrollToId(id: string) {
  //   console.log("element id : ", id);
  //   this.service.scrollToElementById(id);
  // }

  ngOnDestroy(): void {
    if (this.isBrowser) {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
    }
  }
  
}