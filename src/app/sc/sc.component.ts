import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sc',
  templateUrl: './sc.component.html',
  styleUrls: ['./sc.component.css']
})
export class ScComponent implements OnInit {


  isHovered: { [key: string]: boolean } = {};
  isalgebra: boolean = false
  openForm: boolean = false;
  isModalOpen: boolean = false;
  isloading: boolean = false;
  isLoading3: boolean = false;
  isloaderpricing:boolean = false;
  error: any = "";
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {

    //kanx video changes 
    const video = this.heroVideo.nativeElement;
   
    // Set volume to 0
    video.volume = 0;
    video.muted = true;
    
    video.play().catch(error => {
      console.error('Video playback failed:', error);
    });
    video.addEventListener('volumechange', () => {
      this.handleVolumeChange(video);
    });
   // this.navigateAndReplaceClass();
    // Autoplay the video by triggering a play event
    
    // if (this.isBrowser) {
    //   const videoIframe = document.getElementById('widget2') as HTMLIFrameElement;
    //   if (videoIframe) {
    //     console.log('hey');
    //     videoIframe.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*');
    //     videoIframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    //   }
    // }
  }
  handleVolumeChange(video: HTMLVideoElement) {
    // Check if the video is muted
    if (video.muted) {
      video.volume = 0;
    //  console.log('Video is muted');
    } else {
      video.volume = 1;
   //   console.log(Video volume is set to ${video.volume});
    }
  }

  subjectform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    firstName: new FormControl('', Validators.required),
    promocode: new FormControl(''),
    lastName: new FormControl('', Validators.required),
  })


  get firstName() {
    return this.subjectform.controls['firstName'];
  }


  get lastName() {
    return this.subjectform.controls['lastName'];
  }


  get email() {
    return this.subjectform.controls['email'];
  }

  /* COURSES NAVIGATION */
  navigateToCoursePage(url: string | UrlTree) {
//  this.router.navigateByUrl(url);
    // this.router.navigate(['/us-history']);
  }

  // toggleGif(hovered: boolean) {
  //   this.isHovered = hovered;
  // }

  toggleGif(course: string, hovered: boolean) {
  //  this.isHovered[course] = hovered;
  }

  togglealgebra(hovered: boolean) {
   // this.isalgebra = hovered
  }


  scrollToPricing(): void {
    const element = document.getElementById('pricing_section_id');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // pricing 

  ModalOpen() {
    // window.open('https://buy.stripe.com/test_5kAdSpdiJcr8awEcMM', '_blank');
    // window.location.href = 'https://buy.stripe.com/test_5kAdSpdiJcr8awEcMM';
    this.openForm = !this.openForm

  }


  closeModal(): void {
    this.isModalOpen = false;
  }
  closeForm() {
    this.openForm = !this.openForm
    this.subjectform.reset()
    this.isloading = false
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


  submitForm() {
    if (this.subjectform.valid) {
      let loginPayload = {
        "email": this.subjectform.value.email,
        "name": this.subjectform.value.firstName + ' ' + this.subjectform.value.lastName,
        "promocode": this.subjectform.value.promocode,
      }
      this.isloading = true
      console.log(loginPayload)
      this.service.sendwaitlistDataSc(loginPayload).subscribe((res: any) => {

        if (res.statusCode == 200) {
          this.planAPI(this.subjectform.value.email) 
this.error = ""
      
        }if (res.statusCode == 201) {
          this.error = res.body
          this.isloading = false
          setTimeout(()=>{
            this.error = ""
           },4000)
         
        }if (res.statusCode == 400) {
          this.error = res.body 
          this.isloading = false
          // setTimeout(()=>{
          //  this.error = ""
          // },3000)
        }
        else{
          this.isloading = false
        }
      })



    } else {
this.validateAllFormFields(this.subjectform);
    }

  }


  planAPI(email: string) {
    this.isloaderpricing = true;
    let payload = {
      "email": email,
      "prod_id": "prod_QofbY9vz5uizFD",
      "plan": "Trailblazer",
      "price_id": "price_1Px2G4ALy7MM11rqM4TsGY5P",
      "mode": "setup",
      "price": "price_1Px2G4ALy7MM11rqM4TsGY5P",
      "price_amount": "199"
    }
    this.service.scSchool(payload).subscribe((res: any) => {
      
     
      if (res.statusCode == 303) {
       
       
        window.location.href = res.headers.Location;
     
       
        this.closeForm()
        this.isloading =false;
      }
    })

  }
}
