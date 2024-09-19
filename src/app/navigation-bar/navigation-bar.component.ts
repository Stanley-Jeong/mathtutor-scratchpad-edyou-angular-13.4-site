import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';
import { UserService } from '../service/user.service';
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
  isLoggedIn: boolean = false;
  userName: any;
  user: any;
 
  userOrderFull: any;
  userDetails: any;
  buttonName: any;
  constructor(
    private router: Router, private service : ColorChangeService, private userservice : UserService,
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
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
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
          if(this.router.url.includes('/SC')){
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
    
    this.userservice.loggedIn$.subscribe(state => {
      this.checkUserLogin()
    });
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
  openLoginPopup(event: any) {
    event.stopPropagation();
  this.userservice.showPopup();
  }
  logOut(){
    this.router.navigate(['/SC']);
    localStorage.removeItem('LoginState');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    this.userservice.logout()
    // window.location.reload();
  

  }
  
  scrollToPricing(): void {
  console.log(  this.currentUrl)
  if(this.currentUrl == '/SC/profile'){
    this.router.navigate(['/SC'], { fragment: 'pricing_section_id' });
   // const element = document.getElementById('pricing_section_id');
    // if (element) {
    //   element.scrollIntoView({ behavior: 'smooth' });
    // }
  }else{
    const element = document.getElementById('pricing_section_id');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  }

  navigateToPricing() {
    this.router.navigate(['SC/pricing'])
  }
  navigateToProfile(){
    this.menuToggle()
    this.sc=true
    this.router.navigate(['/SC/profile']);
  }
  menuToggle() {
    this.getProfileDetail()
    const toggleMenu: any = document.querySelector("#menuId");
    toggleMenu.classList.toggle("active");

    console.log('hit menu')
  }
  checkUserLogin(){
    const storedLoginState = localStorage.getItem('LoginState');

    // Parse the JSON string to a boolean value
    const isLoggedIn = storedLoginState ? JSON.parse(storedLoginState) : false;
    console.log(typeof(isLoggedIn), 'user check',isLoggedIn)
    // Check the login state and perform the corresponding action
    if (isLoggedIn == true) {
      this.getProfileDetail
      this.menuToggle
//  let  x :any = this.userservice.buttonName;
//  console.log(x,'navitem')
//  if(x.orderHistory.length>0){
//   this.buttonName = "Learn"

// }else {
//     this.buttonName = "Startfree"
// }
//  this.userObj = res.user;
// this.shared.SharedData(this.userObj);

console.log(" this.userDetails", this.userDetails)

      console.log('true state')
      this.isLoggedIn = true 
      if (this.user.f_name && this.user.l_name) {
        this.userName = this.user.f_name + " " + this.user.l_name
      } 
    
    } else {
      this.isLoggedIn = false
      this.logOut
      this.user = JSON.parse(localStorage.getItem('user') || '{}')
      this.userservice.loggedIn$.subscribe(state => {
  
        this.isLoggedIn = state;
        console.log('else state ==',isLoggedIn)
        
       // console.log('state login', this.isLoggedIn)
       if (this.user.f_name && this.user.l_name) {
        this.userName = this.user.f_name + " " + this.user.l_name
       }
      });
    }
  }
  
  getProfileDetail() {
    let createToken = {
      // token: this.token,
     email: this.user.email,
    };
    this.userservice.getProfileAPI(createToken).subscribe((res: any) => {
      if (res.statusCode == 200) {
     
        this.userOrderFull= res;
        this.userDetails = res;
        let plan = res.plan 
        let lengthofOrder = res.orderHistory.length
        if(lengthofOrder > 0){
      
          this.checkIfExpired(plan.expire_at)
        }else {
            this.buttonName = "Startfree"
        }
       
        
          // Determine the case based on the order history length
          // switch (lengthofOrder) {
          //   case lengthofOrder > 0:
          //     this.checkIfExpired(plan.expire_at)
          //    // this.buttonName = 'Learn';
          //     break;
          //   case lengthofOrder = 0:
          //     this.buttonName = 'Startfree';

          //     break;
          //     // case lengthofOrder >= 0 and :
          //     //   this.buttonName = 'Startfree';
          //       // break;
          //   default:
          //     this.buttonName = 'Unknown'; // Default case (optional)
          // }
        //  this.userObj = res.user;
        // this.shared.SharedData(this.userObj);
     
console.log(" this.userDetails", this.userDetails)
      }else{
        
      }
    })
  
  }
  linkToedyouUser(){
    console.log(this.user.link,this.user)
    window.location.href = this.user.link;
    
  }
  checkIfExpired(dateTimeString: string) {
    // Convert the date-time string into a JavaScript Date object
    const [datePart, timePart] = dateTimeString.split(',');
    const formattedDateTime = `${datePart}T${timePart}`;
    const parsedDate = new Date(formattedDateTime);

    // Get the current date and time
    const currentDate = new Date();
console.log(parsedDate,currentDate)    // Compare the dates
    if (parsedDate < currentDate) {
      this.buttonName = 'Renew';
    } else {
         this.buttonName = "Learn"
    }
  }

}