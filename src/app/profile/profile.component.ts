import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
// import { FormGroup, FormBuilder } from '@angular/forms'; 
import Swal from 'sweetalert2';
import { NavigationEnd, NavigationStart ,Router} from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  activeTab: string = 'accountDetails';
  edit:boolean = false
  isSpinner: boolean = false ;
  userDetails: any = {};
  createdDate:any;

  selectedProfileData: any;
  user: any;
  isLoading2: boolean = false;
  userOrderFull: any;
  daysLeft:any;
  expireDaysLeft: number=0;
  url: any = '';
  newLoader:boolean =false;
 isLoading:boolean = false;
  currentUrl: string ='url';
  buttonName: string = 'startFree';
  togglecancel: boolean = false;
  subscriptionDetailCustomer: any;
  subscdata: any;
  shouldScrollToFragment: boolean = false;
  modalSuccess: boolean =false;
  modalSuccessProfile : boolean = false;
  constructor(private service:UserService , private router :Router) { }

  ngOnInit(): void {
   
    this.newLoader = false;
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

  
    this.getProfileDetail();

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Navigation is starting
        this.currentUrl = this.router.url;
        console.log('Current URL before navigation starts:', this.currentUrl);
        
      }})
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ).subscribe(() => {
        // Manually scroll to the fragment after navigation ends
       // this.scrollToFragment();
      });
     
  }
  ngAfterViewInit() {
    if (this.shouldScrollToFragment) {
      this.scrollToFragment();
    }
  }
  scrollToFragment() {
    const element = document.getElementById('pricing_section_id');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

      
        
        if (res != null) {
       
          this.isLoading = false;
        this.userOrderFull=res;
        this.userDetails = res.data;
//res.data.cus_id
      
       // const createdDateString = this.userDetails.created_at; // Example ISO format string
        console.log("l",this.userDetails.created_at)
        
    //const createdDate = new Date(createdDateString);
    const createdDateString = this.userDetails.created_at; // Example ISO format string
    console.log('Raw date string:', createdDateString); // Log the raw date string
    
    // Replace comma with space to ensure proper formatting
    const formattedDateString = createdDateString.replace(',', ' ');
    
    const createdDate = new Date(formattedDateString);
    
    // Check if the createdDate is valid
    if (!isNaN(createdDate.getTime())) {
        // Extract day, month, and year and format as 'dd-MM-yyyy'
        const day = ('0' + createdDate.getDate()).slice(-2); // Add leading zero if necessary
        const month = ('0' + (createdDate.getMonth() + 1)).slice(-2); // Months are zero-indexed, so add 1
        const year = createdDate.getFullYear();
    
        // Combine into 'dd-MM-yyyy' format
        this.createdDate = `${day}-${month}-${year}`;
    } else {
        console.error('Invalid date:', formattedDateString);
        this.createdDate = 'Invalid date'; // Set a fallback value
    }
    // Extract day, month, and year and format as 'dd-MM-yyyy'
    // const day = ('0' + createdDate.getDate()).slice(-2); // Add leading zero if necessary
    // const month = ('0' + (createdDate.getMonth() + 1)).slice(-2); // Months are zero-indexed, so add 1
    // const year = createdDate.getFullYear();

    // // Combine into 'dd-MM-yyyy' format
    // this.createdDate = `${day}-${month}-${year}`;
  
        ///  this.createdDate = new Date(this.userDetails.created_at);
          console.log(this.userDetails)
          console.log(this.createdDate)
        this.bindWithSelectedPrfileData( this.userDetails);
        if(this.userDetails.cus_id){
          let payload ={
            "request": "get_customer_product",
           "customer_id": this.userDetails.cus_id
         }
          this.service.getSubscriptionDetail(payload).subscribe((res: any) => {
            if(res.statusCode == 200){
              this.newLoader = true;
              this.subscriptionDetailCustomer = res.body;
              if(this.subscriptionDetailCustomer.length > 0){
              //  console.log(this.subscriptionDetailCustomer,'detail',this.subscriptionDetailCustomer[0].end_date,this.subscriptionDetailCustomer[0].activation_date)
                this.checkIfExpired(this.subscriptionDetailCustomer[0].end_date)
              }
  
              // console.log(this.subscriptionDetailCustomer,'detail',this.subscriptionDetailCustomer[0].end_date,this.subscriptionDetailCustomer[0].activation_date)
              // this.checkIfExpired(this.subscriptionDetailCustomer[0].end_date)
           
  
       //   console.log(this.subscriptionDetailCustomer[0].end_date)
          
          }
     
  
  
          // this.shared.SharedData(this.userObj);

         } )
        }
        
        
       
      }
      //this.checkUserSubscription
    }else{
      this.isLoading = true
      }
      
    })
    localStorage.setItem('email', this.user.email);
    
  }


  bindWithSelectedPrfileData(selectedProfile: any) {
    this.selectedProfileData = selectedProfile;
    console.log( this.selectedProfileData,'edit')
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
            this.openModal('profile')
            this.isLoading2 = false
            // Swal.fire({
            //   // title: "Welcome",
            //   text: res.body,
            //   confirmButtonText: "ok ",
            //   showConfirmButton: false,
            //   confirmButtonColor: '#2a7cc7',
            //   timer: 2000,
            //   allowOutsideClick: false,
            // }).then((result) => {
            
           
            // });
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
 // console.log(this.subscdata)
// this.checkUserSubscription


let subscdata = localStorage.getItem('subscription')
if(subscdata)

 { this.subscdata = JSON.parse(subscdata); }
 else
 {
  this.subscdata = []
 }
 
 //console.log(this.subscdata[0].subscription_id)
 if (this.subscdata && Array.isArray(this.subscdata) && this.subscdata.length > 0) {
 // console.log('First subscription:', this.subscdata[0],this.user.f_name,);  // Check the first element

    let data = {
     
      request:"cancel_subscription",
      subscription_id: this.subscdata[0].subscription_id,
      name:this.user.f_name,
      email:this.user.email,
    // "request": "cancel_subscription",
 // "subscription_id": "sub_1Q3b40ALy7MM11rqGxkRf3Xq"}
    };
    this.service.getSubscriptionDetail(data).subscribe((res: any) => {
      if (res.statusCode == 200) {
   //  alert("Success")
  // this.isModalOpen
   //this.openModal('plan')
   this.modalSuccess  = true;
  // this.modalSuccess  = true;
     setTimeout(() => {
      this.togglecancel = true
      let sc = localStorage.getItem('url') 
      //this.router.url.includes('/sc')
    
     if(sc && sc.includes('sc') ){
      this.router.navigate(['/SC/profile']);
     
     }else if(sc){
     this.router.navigate(['/profile']);
    
      }else{
        this.router.navigate(['/']);
      }
     }, 1000);
   

  
      }else{
       // alert("We are currently not able to process.")
      }
    })
  }
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
   
    let storedSubscription = localStorage.getItem('subscription') 
    console.log(storedSubscription)
    if (storedSubscription) {
      this.subscdata = JSON.parse(storedSubscription);
    } else {
      this.subscdata = null;  // or assign any default value you prefer
    }
  
    console.log(this.subscdata);  // This will now log the actual parsed subscription data
  
  }

  Subscription(){
  
 console.log(this.currentUrl)
 let user = localStorage.getItem('url') 
 if(user){

  let sc = localStorage.getItem('url') 
  //this.router.url.includes('/sc')

 if(sc && sc.includes('sc') ){
  
  this.router.navigate(['/SC'], { fragment: 'pricing_section_id' });
  this.shouldScrollToFragment = true; 
  const element = document.getElementById('pricing_section_id');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  //this.scrollToFragment
 }
  else if (sc) {
    this.shouldScrollToFragment = true; 
      this.router.navigate(['/'], { fragment: 'pricing_section_id' }).then(() => {
        setTimeout(() => {
          const element = document.getElementById('pricing_section_id');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
    }
    
      }
  }
  

  checkIfExpired(dateTimeString: string) {
    // If the input is already in a valid format, you can parse it directly.
    const parsedDate = new Date(dateTimeString); // Use the input string directly

    // Get the current date and time
    const currentDate = new Date();
    
    console.log(parsedDate, currentDate); // Log parsed date and current date

    // Compare the dates
    if (isNaN(parsedDate.getTime())) { // Check if parsed date is valid
        console.error('Invalid date string:', dateTimeString);
        return;
    }

    if (parsedDate < currentDate) {
        this.buttonName = 'Renew';
    } else {
        this.buttonName = 'Cancel';
    }
}
isModalOpen: boolean = false;

// Method to open the modal
openModal(data:any) {
 // this.isModalOpen = true;
 if(data == 'profile'){
  this.modalSuccessProfile = true
}else if (data == 'plan'){
  this.modalSuccess = true
}else{
  this.isModalOpen = true;
}
}
// Method to close the modal
closeModal() {
  this.isModalOpen = false;
  this.modalSuccess = false;
  this.modalSuccessProfile = false;
}
confirmCancellation() {
 
 this.cancelSubscription(); // Call the method to cancel the subscription
   // Close the modal first
   //this.closeModal();
  // this.isModalOpen = false
}
can(){
  this.isModalOpen = true;
}
}
