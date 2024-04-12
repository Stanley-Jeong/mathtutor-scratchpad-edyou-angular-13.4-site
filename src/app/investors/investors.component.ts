import { Component, OnInit } from '@angular/core';
import { Investor } from '../models/investor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvestorsService } from '../service/investors.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.css']
})
export class InvestorsComponent implements OnInit {

  investorForm: FormGroup = new FormGroup({});
  successMessage: string = '';
  loading: boolean = false; // Track loading state
  successMessageVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private investorsService: InvestorsService,
  ) { }

  ngOnInit(): void {
    this.investorForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Only allow numeric characters
      company: ['', [Validators.required]],
      user_information: ['', [Validators.required]]
    });
  }

  requestAccess() {
    if (this.investorForm.valid) {
      this.loading = true;
      const investor: Investor = this.investorForm.value;
      this.investorsService.requestAccess(investor)
        .pipe(
          catchError(error => {
            console.log("Error submitting form:", error);
            this.successMessage = 'Error! Requesting access failed';
            this.showSuccessMessage();
            // You can return a new error with more context if needed
            return of(new Error('Form submission failed'));
          })
        )
        .subscribe(
          response => {
            console.log(response)
            console.log(response.statusCode);
            if (response && response.statusCode === 200) {
              this.successMessage = '✔️ '+ response.body;
              this.showSuccessMessage();
              this.investorForm.reset();
            } else {
              this.successMessage = 'Error! Requesting access failed';
              this.showSuccessMessage();
              console.log("Error submitting form.");
            }
            this.loading = false;
          }
        );
    } else {
      // Handle invalid form submission
      console.log("Invalid form submission.");
    }
  }

  showSuccessMessage() {
    this.successMessageVisible = true;
    setTimeout(() => {
      this.successMessageVisible = false;
    }, 5000); // 10 seconds
  }

  // Helper function to check if a form control has an error
  hasError(controlName: string, errorName: string) {
    return this.investorForm.get(controlName)?.hasError(errorName) && this.investorForm.get(controlName)?.touched;
  }
}