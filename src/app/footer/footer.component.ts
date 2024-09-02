import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private isBrowser: boolean;
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
   }

  ngOnInit(): void {}
  defaultImage: string = '../assets/icons/twitter.png'; // Path to your default image
  hoverImage: string = '../assets/icons/twitter-white.png'; // Path to your hover image
  isHovered: boolean = false;

  onMouseOver(): void {
    this.isHovered = true;
  }

  onMouseOut(): void {
    this.isHovered = false;
  }
  navigateToCompany() {
    this.router.navigate(['/company']).then(()=> {})
  }  

  navigateToSafety() {
    this.router.navigate(['/safety']).then(()=> {})
  }    

  navigateToLabs() {
    this.router.navigate(['/labs']).then(()=> {})
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

  navigateToTerms(){
    this.router.navigate(['/terms']);
  }

  navigateToPrivacy(){
    if (this.isBrowser) {
    this.router.navigate(['/privacy']).then(()=>{
      window.scrollTo(0,0);
    });
  }
  }

  navigateToMain(){
    this.router.navigate(['/main']);
  }

  toggleHeight(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const parentLi = target.closest('li');
    if (parentLi) {
      const subMenu = parentLi.querySelector('.sub-menu') as HTMLElement;
      if (subMenu) {
        subMenu.classList.toggle('collapsed');
      }
    }
  }
  
  
  
}
