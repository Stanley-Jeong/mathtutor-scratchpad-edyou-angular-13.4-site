import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToCompany() {
    this.router.navigate(['/company']).then(()=> {
      // window.location.reload();
    })
  }  

  navigateToSafety() {
    this.router.navigate(['/safety']).then(()=> {
      // window.location.reload();
    })
  }    

  navigateToLabs() {
    this.router.navigate(['/labs']).then(()=> {
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

  navigateToTerms(){
    this.router.navigate(['/terms']);
  }

  navigateToPrivacy(){
    this.router.navigate(['/privacy']).then(()=>{
      window.scrollTo(0,0);
    });
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
