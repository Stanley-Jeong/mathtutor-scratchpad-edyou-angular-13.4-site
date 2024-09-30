import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';
import { UserService } from '../service/user.service';
import { ChangeDetectorRef } from '@angular/core';
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
  isbuttondisabled: boolean =false;
  updatedData:any

  scloggedin: boolean =false;
  b2cloggin: boolean =false;
  no_user_Loggedin : boolean =false;

  fordesktop : boolean =false;
  forMobile : boolean =false;
  forIpad : boolean =false;
  subscriptionDetailCustomer: any;
  subscriptionDetailinfo: any = [];

  constructor(private cd:ChangeDetectorRef,
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
          if(this.router.url.includes('/SC')||this.router.url.includes('/sc')){
             this.isScPage =true;
             this.forMobile = false
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
            this.forMobile = true
            this.sc = false;
          }

          // if(width< 601 && this.router.url.includes('/SC')||this.router.url.includes('/sc')){
          //   this.isScPage = true;
          //   this.forMobile = false
          // }else{
          //   this.isScPage = true;
          //   this.forMobile = true
          // }
        
          //   console.log('Current URL before navigation starts:', this.currentUrl,this.isSafetyState);
          this.hideNavigation()
        }
      this.checkdevice()
    });
 
  
    // console.log(width)
    // if (width < 1024) {
    //   this.screenSize = 'small'; // Mobile
    // } else {
    //   this.screenSize = 'large'; // Desktop
    // }
    
    this.userservice.loggedIn$.subscribe(state => {
      this.checkUserLogin()
      const storedUserData = localStorage.getItem('user');
      if (storedUserData) {
        this.updatedData = JSON.parse(storedUserData);
        console.log(this.updatedData)
        this.userName = this.updatedData.f_name + " " + this.updatedData.l_name;
      }
      
        //   this.openSuccessPopup = false
        // },2000)
     
        this.cd.detectChanges();
  })
  this.userservice.subscription$.subscribe(subscriptionData => {
    this.subscriptionDetailinfo = subscriptionData || [];
    this.buttonName = this.subscriptionDetailinfo.length === 0 ? "Startfree" : "Learn";
    this.cd.detectChanges(); // Update the UI accordingly
  });
    this.getProfileDetail()
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
    if(this.no_user_Loggedin == true){
      this.router.navigate(['/main']);
    }else if(this.b2cloggin == true){
      this.router.navigate(['/main']);
    }else if(this.scloggedin == true){
      this.router.navigate(['/sc']);
    }
   let url1  = localStorage.getItem('url');
    if(url1 && url1.includes('/sc')){
     this.router.navigate(['/SC']);
    }else{
     this.router.navigate(['/']);
    }
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
    console.log(event,'login')
    event.stopPropagation();
  this.userservice.showPopup();
  }
  logOut(){
    if(this.scloggedin == true){
      this.router.navigate(['/sc']);
    }else{
      this.router.navigate(['/']);
    }
    
    localStorage.removeItem('LoginState');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    localStorage.removeItem('url');
    localStorage.removeItem('Login_User');
    localStorage.removeItem('subscription');
    this.userservice.logout()
    this.isbuttondisabled = false
    // window.location.reload();
  

  }
  
  scrollToPricing(): void {
  console.log(  this.currentUrl)
 
  if(this.currentUrl == '/SC/profile'|| this.currentUrl == '/SC'){
    this.router.navigate(['/SC'], { fragment: 'pricing_section_id' });
    
   const element = document.getElementById('pricing_section_id');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }else if (this.currentUrl == '/profile'||this.currentUrl == '/'){
   
    this.router.navigate(['/'], { fragment: 'pricing_section_id' });
    // const element = document.getElementById('pricing_section_id');
    // if (element) {
    //   element.scrollIntoView({ behavior: 'smooth' });
    // }
    setTimeout(() => {
      const element = document.getElementById('pricing_section_id');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);  // Delay to ensure navigation is complete before scrolling
  }
//this.scrollToFragment
  }

  scrollToFragment() {
    // Delay to ensure the DOM is updated
    setTimeout(() => {
      const element = document.getElementById('pricing_section_id');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }
  navigateToPricing() {
    this.router.navigate(['SC/pricing'])
  }
  navigateToProfile(){
    this.menuToggle()
   // this.sc=true
    let url1 
     url1  = localStorage.getItem('url');
     if(url1 && url1.includes('/sc')){
      this.router.navigate(['/SC/profile']);
     }else{
      this.router.navigate(['/profile']);
     }
 
 
  }
  menuToggle() {

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
      // if (this.user.f_name && this.user.l_name) {
      //   this.userName = this.user.f_name + " " + this.user.l_name
      // } 
    
    } else {
      this.isLoggedIn = false
      this.logOut
      this.user = JSON.parse(localStorage.getItem('user') || '{}')
      this.userservice.loggedIn$.subscribe(state => {
  
        this.isLoggedIn = state;
        console.log('else state ==',isLoggedIn)
        
       // console.log('state login', this.isLoggedIn)
      //  if (this.user.f_name && this.user.l_name) {
      //   this.userName = this.user.f_name + " " + this.user.l_name
      //  }
      });
    }
 

    let loggedin_User = localStorage.getItem('Login_User');
    console.log(loggedin_User)
    if(isLoggedIn == true && loggedin_User == '"SC"'){
     
      // let subscription_exist =  localStorage.getItem('subscription[0].end_date');
      // if(subscription_exist)
      // {this.checkIfExpired(subscription_exist)}
      this.scloggedin = true
      this.b2cloggin = false
    //  console.log('sc logged in',subscription_exist)
      this.no_user_Loggedin  =false

    }else if(isLoggedIn == true && loggedin_User == '"B2C"'){
      console.log('b2c logged in')
      this.scloggedin = false
      this.b2cloggin = true
      this.no_user_Loggedin  =false
    }
      else if (isLoggedIn == true && loggedin_User == '"SC"'){
        console.log('!logged in')
        this.scloggedin = true
        this.b2cloggin = false
        this.no_user_Loggedin  = true
      }
    
    else{
      console.log('!logged in')
      this.scloggedin = false
      this.b2cloggin = false
      this.no_user_Loggedin  = true
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
        this.userDetails = res.data;
        
     
console.log(" this.userDetails", this.userDetails)

      }else{
        
      }
    })
    this.cd.detectChanges();
  }
  linkToedyouUser(){
    let user  = localStorage.getItem('user');
    console.log(user)
    if (user) {
      // Parse the string back into a JavaScript object
     let user1 = JSON.parse(user); 
    
      // Now you can access the 'link' property
      console.log(user1.link, 'urltomove', this.user);
     // const userLink: string = user1.link;

      // If you want to navigate, uncomment this:
      window.location.href = user1.link;
    }else{
      window.location.href= 'https://smdev.edyou.com/' 
    }
  
   

  }
  checkIfExpired(dateTimeString: string) {
    // Convert the date-time string into a JavaScript Date object
    const [datePart, timePart] = dateTimeString.split(',');
    const formattedDateTime = `${datePart}T${timePart}`;
    const parsedDate = new Date(formattedDateTime);
console.log('button',this.buttonName)
    // Get the current date and time
    const currentDate = new Date();
console.log(parsedDate,currentDate)    // Compare the dates
    if (parsedDate < currentDate) {
      this.buttonName = 'Renew';
     this.isbuttondisabled = true
    } else {
         this.buttonName = "Learn"
       
    }
  }

  checkdevice(){
    if(window.innerWidth > 767){
      this.fordesktop = true
      this.forIpad = false
    }else{
      this.fordesktop = false
      this.forIpad = true
    }
    
  }

  
  
  



}