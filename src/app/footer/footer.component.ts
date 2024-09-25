import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private isBrowser: boolean;
  newsletterForm !: FormGroup;

  defaultImage: string = '../assets/icons/twitter.png'; // Path to your default image
  hoverImage: string = '../assets/icons/twitter-white.png'; // Path to your hover image
  isHovered: boolean = false;
  isLoading:boolean = false
  onsuccess:boolean = false
  isDropdownOpen:boolean = false;
  
  
  constructor(private router: Router,private route :ActivatedRoute,private fb: FormBuilder,private service :UserService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.newsletterForm = this.fb.group({
      email: ['', [Validators.email, this.customEmailValidator]],
    });
   }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: string | null) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the element
        }
      }
    });
  }


  get email() {
    return this.newsletterForm.get('email');
  }

  

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

  customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailPattern.test(control.value);
    return valid ? null : { invalidEmail: true };
  }

  newslettersubmit(){
    this.isLoading = true
    if (this.newsletterForm.valid) {
      const pay = {
        name:"",
        email: this.newsletterForm.value.email,
      };// this.router.navigate([], { fragment: 'newsForm' });
    
      
      this.service.signupNewsletter(pay).subscribe((res:any)=>{
        console.log(res)
        if(res.statusCode == 200){
          this.isLoading = false
          this.newsletterForm.reset();
          this.onsuccess =true
          this.router.navigate(['/newsletter-success']);
          setTimeout(()=>{
            this.onsuccess = false
          },3000)
        }else{
          this.isLoading = false
        }
      })
      
    }else{
      this.isLoading = false
      console.log('form not valid')
      this.newsletterForm.get('email')?.markAsTouched();
    }
  }
  
  
}
