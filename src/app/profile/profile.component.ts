import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
// import { FormGroup, FormBuilder } from '@angular/forms'; 
import Swal from 'sweetalert2';
import { NavigationStart } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  activeTab: string = 'accountDetails';
  edit:boolean = false
  isSpinner: boolean = false ;
  userDetails: any = [];
  selectedProfileData: any;
  user: any;
  isLoading2: boolean = false;
  userOrderFull: any;
  daysLeft:any;
  expireDaysLeft: number=0;
  url: any = '';
  router: any;
  currentUrl: string ='url';
  constructor(private service:UserService) { }

  ngOnInit(): void {

    
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.getProfileDetail();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Navigation is starting
        this.currentUrl = this.router.url;
        console.log('Current URL before navigation starts:', this.currentUrl);
        
      }})
  }

  editProfileForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl(''),
    dob: new FormControl(''),
    school: new FormControl(''),
    // editEmail: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    editEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
    ]),
   
  })
 
  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }

  editUser() {
    this.edit = !this.edit;
    // if (event.edit == false) {
    //   this.getProfileDetail();
    // }
  }

  editprofile(){
    
  }

  getProfileDetail() {
    let createToken = {
      // token: this.token,
     email: this.user.email,
    };
    this.service.getProfileAPI(createToken).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.isSpinner = false;
        if (res != null) {
        this.userOrderFull=res;

        this.userDetails = res.data;
        }
        const createdAt = new Date(res.plan.created_at.replace(',', 'T'));

        const planDate = new Date(createdAt);
        const expireAt = new Date(res.plan.expire_at.replace(',', 'T'));
        
        planDate.setDate(planDate.getDate() + 14);

// Get the current date
const currentDate = new Date();

// Calculate the difference in time (milliseconds)
const timeDifference = planDate.getTime() - currentDate.getTime();
const expiredIn = expireAt.getTime()-currentDate.getTime();
this.expireDaysLeft = Math.ceil(expiredIn / (1000 * 60 * 60 * 24));
// Convert the time difference to days
 this.daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

if (this.daysLeft > 0) {
  console.log(`There are days left.`,this.daysLeft);
} else {
  console.log("The 14-day period has expired.");
}
        // this.shared.SharedData(this.userObj);
        this.bindWithSelectedPrfileData(res.data);
console.log(" this.userDetails", this.userDetails)
      }else{
        
      }
    })
    localStorage.setItem('email', this.user.email);
  }


  bindWithSelectedPrfileData(selectedProfile: any) {
    this.selectedProfileData = selectedProfile;
    console.log( this.selectedProfileData)
    this.editProfileForm.get('first_name')?.setValue(selectedProfile.f_name);
    this.editProfileForm.get('last_name')?.setValue(selectedProfile.l_name);
    this.editProfileForm.get('dob')?.setValue(selectedProfile.dob);
    this.editProfileForm.get('school')?.setValue(selectedProfile.tenantName);
    this.editProfileForm.get('editEmail')?.setValue(selectedProfile.email);
    this.editProfileForm.get('profilePicture')?.setValue(selectedProfile.profilePicture)

  }




    updateProfile() {
      if (this.editProfileForm.valid) {
        let editProfilePayload = {
          // token: this.token,
         // id: this.user.id,
          'f_name': this.editProfileForm.value.first_name,
          'l_name': this.editProfileForm.value.last_name,
          'DOB': this.editProfileForm.value.dob,
          'tenantName': this.editProfileForm.value.school,
          'email': this.editProfileForm.value.editEmail,
         'profilePicture':this.url
        //  role: this.user.role,
        };this.isLoading2 = true
        console.log(editProfilePayload);
        this.service.updateProfileAPI(editProfilePayload).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.isLoading2 = false
            Swal.fire({
              // title: "Welcome",
              text: res.body,
              confirmButtonText: "ok ",
              showConfirmButton: false,
              confirmButtonColor: '#2a7cc7',
              timer: 2000,
              allowOutsideClick: false,
            }).then((result) => {
            
           
            });
           } else if (res.statusCode == 401) {
            this.isLoading2 = false
           } else if (res.statusCode == 402) {
            this.isLoading2 = false
           }else{
            this.isLoading2 = false
           }
        })

      }
  }
  cancelSubscription() {
    let data = {
      // token: this.token,
      Subscription_id: this.user.Subscription_id,
    };
    this.service.cancelSubscription(data).subscribe((res: any) => {
      if (res.statusCode == 200) {
     alert("Success")

      }else{
        alert("We are currently not able to process.")
      }
    })

  }


  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        if (event.target){
        this.url = event.target.result;
        console.log(this.url);
        }
      };
    }
  }
  public delete() {
    this.url = null;
  }

  checkUserSubscription(){
    console.log(this.userOrderFull)
  }
  Subscription(){
  
 console.log(this.currentUrl)
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
  
}
