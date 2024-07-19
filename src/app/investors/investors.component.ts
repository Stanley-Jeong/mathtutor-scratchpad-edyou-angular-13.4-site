import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Investor } from '../models/investor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvestorsService } from '../service/investors.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.css']
})
export class InvestorsComponent implements OnInit {

  investorForm: FormGroup = new FormGroup({});
  successMessage: string = '';
  loading: boolean = false; 
  successMessageVisible: boolean = false;
  scrollKey: any;
  private isBrowser: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private investorsService: InvestorsService,
    private titleService: Title, private metaService: Meta,
    private router: Router,private service : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object
  ) {this.isBrowser = isPlatformBrowser(this.platformId); }

  ngOnInit(): void {
    this.setTitle('Investor Page - Investor of Use');
    this.setMetaDescription('Investor Page - Description');
    this.investorForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]], 
      company: ['', [Validators.required]],
      user_information: ['', [Validators.required]]
    });
    this.toggleBtnBlockClass();
  }
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  setMetaDescription(description: string) {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  requestAccess() {
    if (this.investorForm.valid) {
      this.loading = true;
      const investor: Investor = this.investorForm.value;
      this.investorsService.requestAccess(investor)
        .pipe(
          catchError(error => {
            this.successMessage = 'Error! Requesting access failed';
            this.showSuccessMessage();
            return of(new Error('Form submission failed'));
          })
        )
        .subscribe(
          response => {
            if (response && response.statusCode === 200) {
              this.successMessage = '✔️ '+ response.body;
              this.showSuccessMessage();
              this.investorForm.reset();
            } else {
              this.successMessage = 'Error! Requesting access failed';
              this.showSuccessMessage();
            }
            this.loading = false;
          }
        );
    } else {
    }
  }

  showSuccessMessage() {
    this.successMessageVisible = true;
    setTimeout(() => {
      this.successMessageVisible = false;
    }, 5000); 
  }

  // Helper function to check if a form control has an error
  hasError(controlName: string, errorName: string) {
    return this.investorForm.get(controlName)?.hasError(errorName) && this.investorForm.get(controlName)?.touched;
  }

  navigateToInvestorLogin(){
    this.router.navigate(['/investorLogin']);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.toggleBtnBlockClass();
  }

  toggleBtnBlockClass() {
    if (this.isBrowser) {
    const myButton = document.getElementById('myButton');
    if (window.innerWidth < 576) {
      myButton?.classList.add('btn-block');
    } else {
      myButton?.classList.remove('btn-block');
    }
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
    }
  }


}