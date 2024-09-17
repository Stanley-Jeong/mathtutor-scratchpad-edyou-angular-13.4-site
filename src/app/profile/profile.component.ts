import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
// import { FormGroup, FormBuilder } from '@angular/forms'; 
import Swal from 'sweetalert2';
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
  
  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.getProfileDetail()
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
        this.userOrderFull=res;
        this.userDetails = res.data;
        //  this.userObj = res.user;
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
     email: this.user.email,
    };
    this.service.cancelSubscription(data).subscribe((res: any) => {
      if (res.statusCode == 200) {
     alert("success")

      }else{
        
      }
    })

  }

  url: any = '';
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
    
  }
}
