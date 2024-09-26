
import { Component, HostListener, OnInit } from '@angular/core';
import * as $ from 'jquery';  // Import jQuery
import { UserService } from '../service/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { validateConfirmPassword } from '../directives/customValidator.directive';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  showPopup: boolean = false;
  isLoading: boolean = false
  show: boolean = false;
  isOverlayActive: boolean = false
  signUpForm: boolean = false
  signInForm: boolean = true
  forgetInForm: boolean = false
  isForgetSubmitTrue: boolean = false
  isLoading2: boolean = false;
  showMessage: any;
  isSignUpFormSubmit: boolean = false
  errorMessage: any = '';
  isForgetFormSubmit: boolean = false
  resetPasswordActive: boolean = false
  forgetLoader: boolean = false;
  resetLoader: boolean = false;
  loggedInDaTa: any;

  constructor(private userserice: UserService, private formBuilder: FormBuilder, private router :Router) { }

  ngOnInit(): void {
    this.userserice.popupState$.subscribe(state => {
      this.showPopup = state;
      if (this.showPopup == true) {
        $('#login').addClass('show'); // This will trigger the modal to open
        this.isOverlayActive = true
      }
      console.log('login', this.showPopup)
    });


  }

  // form group
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new FormControl('', Validators.required),
  })


  //signUp
  // form group
  signUpform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new FormControl('', Validators.required),
    f_name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
   // school: new FormControl('', Validators.required),
    l_name: new FormControl('', Validators.required),
  })


  //signUp
  // form group
  forgetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
  })

  //restPassword
  // form group
  // restPasswordForm = new FormGroup({
  //   newPassword: new FormControl('', [ Validators.required,Validators.minLength(8)]),
  //   confirmPassword: new FormControl('', [ Validators.required,Validators.minLength(8)]),
  // })


  restPasswordForm =  this.formBuilder.group({
    newPassword: new FormControl('', [ Validators.required,Validators.minLength(8)]),
    confirmPassword: new FormControl('', [ Validators.required,Validators.minLength(8)]),
  }, { validator: validateConfirmPassword('newPassword', 'confirmPassword') });



  //otp 
  otpForm = new FormGroup({
    otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    otp3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    otp4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    otp5: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    otp6: new FormControl('', [Validators.required, Validators.maxLength(1)]),
  });

  // validation  controls for form 
  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }
  // sign up validation 

  // validation  controls for form 
  get emails() {
    return this.signUpform.controls['email'];
  }

  // validation  controls for form 
  get fname() {
    return this.signUpform.controls['f_name'];
  }

  get lname() {
    return this.signUpform.controls['l_name'];
  }

  get date() {
    return this.signUpform.controls['date'];
  }

  // get school() {
  //   return this.signUpform.controls['school'];
  // }

  get passwordF() {
    return this.signUpform.controls['password'];
  }

  // reset password validation
  get newPassword() {
    return this.restPasswordForm.controls['newPassword'];
  }

  // validation  controls for form 
  get confirmPassword() {
    return this.restPasswordForm.controls['confirmPassword'];
  }



  closePopup() {
    const modalElement = document.getElementById('login');
    if (modalElement) {
      modalElement.classList.remove('show'); // Remove the show class
    }
    // this.userserice.hidePopup();
    this.isOverlayActive = false
    this.signInForm = true
    this.forgetInForm = false
    this.signUpForm = false
    this.isForgetFormSubmit = false
    this.isForgetSubmitTrue = false
    this.resetPasswordActive = false
    this.form.reset()
    this.signUpform.reset()
    this.forgetForm.reset()
    this.restPasswordForm.reset()
    this.otpForm.reset()
  }

  openLoginModal(): void {
    $('#login').modal('show'); // This will trigger the modal to open
  }


  getTenantList() {
    console.log('hit fun=======================')
    let pay = {}
    this.userserice.getTenant(pay).subscribe(
      (data: any) => {
        if (data.statusCode == 200) {
          console.log(data)
        }
      })
  }


  /**
 * * This function verifies the user's credentials and grants access if they are valid.
 *  It may involve checking the username/password against a database or an authentication service.
 * Returns a success message or throws an error if authentication fails.
 */
  login() {
    if (this.form.valid) {
      let loginPayload = {
        "email": this.form.value.email,
        "password": this.form.value.password,
      }
      this.isLoading = true
      this.userserice.signIn(loginPayload).subscribe(
        (data: any) => {
          if (data.statusCode == 200) {
            this.isLoading = false
            this.loggedInDaTa = data;
            console.log(this.loggedInDaTa)
            if (this.loggedInDaTa.url.includes('/sc')) {
              console.log('URL contains /sc',this.loggedInDaTa.url);
              this.router.navigate(['/SC']);
              // Perform any logic if needed
            } else {
              console.log('URL does not contain /sc');
              this.router.navigate(['/']);
            }
            localStorage.setItem("url", JSON.stringify(data.url));
            localStorage.setItem("user", JSON.stringify(data.body));
            localStorage.setItem("LoginState", JSON.stringify(true));
         
            //  localStorage.setItem("token", JSON.stringify(data.Token));
            this.userserice.login( this.loggedInDaTa );
  
            this.closePopup()
          }
          else if(data.statusCode == 401) {
            this.isLoading = false

            this.errorMessage = data.body
            setTimeout(() => {
              this.errorMessage = ''
            },3000)
            // If there is an error with the request, display an error message
            // this.statusCodeError(data)
          } else if(data.statusCode == 402) {
            this.isLoading = false

            this.errorMessage = data.body
            setTimeout(() => {
              this.errorMessage = ''
            },3000)
          }
        })
    } else {
      this.validateAllFormFields(this.form);
      localStorage.removeItem('email');
      localStorage.removeItem('user');
    }

  }


  signUp() {


    if (this.signUpform.valid) {
      let loginPayload = {
        "email": this.signUpform.value.email,
        "f_name": this.signUpform.value.f_name,
        "l_name": this.signUpform.value.l_name,
        "password": this.signUpform.value.password,
        'dob': this.signUpform.value.date,
        "tenantName": "Sierra Canyon",
        "purchase": 7,
        "grade": "Grade 6"
      }
      this.isLoading2 = true
      this.userserice.signUp(loginPayload).subscribe(
        (data: any) => {
          if (data.statusCode == 200) {
            this.isLoading2 = false

            //  this.showMessage = data.body

            this.isSignUpFormSubmit = true
            // setTimeout(() => {
            //   this.showMessage = '' 
            // //  this.signInFun()
            // }, 4000)
          }

        })
    } else {
      this.validateAllFormFields(this.signUpform);
    }

  }


  otpVerify(value: any) {
    let emailvalue
    if (value == true) {
      emailvalue = this.forgetForm.value.email
    } else {
      emailvalue = this.signUpform.value.email
    }
    if (this.otpForm.valid) {
      let payload = {
        "email": emailvalue,
        "forgot": value,
        // email: 'raitest@yopmail.com',
        "resend": false,
        "OTP": Object.values(this.otpForm.value).join('')
      }
      console.log(payload)
      this.isLoading2 = true
      this.userserice.verifyOTP(payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.isLoading2 = false
          this.otpForm.reset()
          this.signUpform.reset()

          this.showMessage = res.message
          setTimeout(() => {
            this.showMessage = ''
            localStorage.setItem("user", JSON.stringify(res.body));
            //localStorage.setItem("token", JSON.stringify(res.Token));
            this.userserice.login(this.loggedInDaTa );
            this.closePopup()
          }, 3000)
        } else if (res.statusCode == 201) {
          // reset password
          this.isLoading2 = false
          this.otpForm.reset()
          this.showMessage = res.message
          setTimeout(() => {
            this.showMessage = ''
            this.isForgetFormSubmit = false
            this.resetPasswordActive = true
          //  this.closePopup()
          },2000)

        } else if (res.statusCode == 202) {
          this.isLoading2 = false
          this.otpForm.reset()
          this.signUpform.reset()
          this.errorMessage = res.message
          setTimeout(() => {
            this.errorMessage = ''
            //  this.signInFun()
          }, 4000)
        }

      })

    }


  }


  forgetSubmit() {
    let payload = {
      "email": this.forgetForm.value.email
    }
  this.forgetLoader  =true
    this.userserice.forgotAPI(payload).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.forgetLoader = false
        this.isForgetSubmitTrue = true
        this.isForgetFormSubmit = true
      } else {
 this.forgetLoader = false
      }

    })

  }


  resetPassword() {
    let payload = {
      "email": this.forgetForm.value.email,
      "password": this.restPasswordForm.value.newPassword,
      "confpassword": this.restPasswordForm.value.confirmPassword
    }

this.resetLoader = true
    this.userserice.ResetPassword(payload).subscribe((res: any) => {
      if (res.statusCode == 200) {
       this.resetLoader = false
        this.restPasswordForm.reset()
        this.forgetForm.reset()
        this.showMessage = res.message
        setTimeout(() => {
          this.showMessage = ''
          this.isForgetFormSubmit = false
          this.resetPasswordActive = true
          this.closePopup()
        //  this.closePopup()
        },2000)
      } else {
this.resetLoader = false
      }

    })

  }


  /**
  * This function iterates through all form controls in the specified FormGroup and marks them as touched to trigger validation.
  * @param {FormGroup} formGroup - The FormGroup containing form controls to be validated.
  * @returns {void}
  */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  signUpFun() {
    this.signInForm = false
    this.signUpForm = true
    this.forgetInForm = false
  }

  signInFun() {
    this.signInForm = true
    this.signUpForm = false
    this.forgetInForm = false
  }

  forgetFun() {
    this.signInForm = false
    this.signUpForm = false
    this.forgetInForm = true
  }


  // password show and hide function
  hideShow() {
    this.show = !this.show
  }

  moveFocus(event: KeyboardEvent, nextElement: string) {
    const target = event.target as HTMLInputElement;
  
    // Check if the key entered is a valid digit (0-9)
    if (target.value.length === 1 && /\d/.test(target.value)) {
      const nextInput = document.querySelector(`[formControlName="${nextElement}"]`) as HTMLInputElement;
      
      if (nextInput) {
        nextInput.focus(); // Move to the next input
      }
    }
  }

}
