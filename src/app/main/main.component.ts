import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { interval, Subject, Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit,OnDestroy {

  private ngUnsubscribe = new Subject();
  scrollKey: any;
  private isBrowser: boolean;
  subjectform!: FormGroup;
  isHovered:boolean = false
  openSuccessPopup:boolean = false;


  constructor(private router: Router,private service :UserService ,private service2 : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
  private titleService: Title, private metaService: Meta,private fb: FormBuilder) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.service.getIp().subscribe((res:any)=>{
      console.log(res,"my ip----------------------------------------------")
    })
    // let id = localStorage.getItem('sessionId') 
    // console.log(id,'regettttttttttttttttttttttttttttttttttttttttt')
    this.subjectform = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    
  }
  

  async ngAfterViewInit() {
    this.navigateAndReplaceClass();
    // Autoplay the video by triggering a play event
    if (this.isBrowser) {
    const videoIframe= document.getElementById('widget2') as HTMLIFrameElement;
    if (videoIframe) {
      console.log('hey');
      videoIframe.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*');
      videoIframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    }
  }

  

  async navigateAndReplaceClass() {
    await this.router.navigateByUrl(this.router.url); // Trigger navigation event
    this.replaceClass("elementor-invisible", "");
  }

  private replaceClass(className: string, newClassName: string): void {
    const elements = document.querySelectorAll("." + className);
    elements.forEach(element => {
      element.classList.remove(className);
    });
  }

  ngOnInit(): void {
    this.setTitle('edYOU - Transforming Education with AI');
    this.setMetaDescription('Discover edYOU, a groundbreaking AI platform that revolutionizes learning through personalized, engaging, and innovative educational experiences.')
    const image1 = document.getElementById('image1') as HTMLImageElement;
    const image2 = document.getElementById('image2') as HTMLImageElement;
    const image3 = document.getElementById('image3') as HTMLImageElement;
    const images: HTMLImageElement[] = [image1, image2, image3];
    this.startImageRotation(images);

    // countdown================
    this.subscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  setMetaDescription(description: string) {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  startImageRotation(images: HTMLImageElement[]): void {
    let currentImageIndex = 0;
    this.fadeIn(images[currentImageIndex]);
    setInterval(() => {
      this.fadeOut(images[currentImageIndex]);
      currentImageIndex = (currentImageIndex + 1) % images.length; 
      this.fadeIn(images[currentImageIndex]);
    }, 5000); 
  }

  fadeIn(imageElement: HTMLImageElement): void {
    imageElement.classList.add('fade-in');
    setTimeout(() => {
      this.fadeOut(imageElement);
    }, 5000); 
  }

  fadeOut(imageElement: HTMLImageElement): void {
    imageElement.classList.remove('fade-in');
    imageElement.classList.add('fade-out');
    setTimeout(() => {
      imageElement.classList.remove('fade-out');
    }, 2000); 
  }

  navigateToSafety() {
    this.router.navigate(['/safety']).then(()=> {
      
    })
  }    
  navigateToMain(){
    this.router.navigate(['/main']);
  }

  navigateToLabs() {
    this.router.navigate(['/labs']).then(()=> {
    })
  }

  navigateToCompany(){
    this.router.navigate(['/company']);
  }

  navigateToEdyousAi(){
    if (this.isBrowser) {
    this.router.navigate(['/how-edyous-ai-is-reimagining-the-future-of-personalized-learning']).then(() => {
      window.scrollTo(0, 0);
    });
  }
  }

  navigateToRevolutionizingEducation(){
    if (this.isBrowser) {
    this.router.navigate(['/revolutionizing-education-with-edyou-bridging-the-post-pandemic-learning-gap']).then(() => {
      window.scrollTo(0, 0);
    });
  }
  }

  navigateToPayItForward() {
    if (this.isBrowser) {
    this.router.navigate(['/pay-it-forward']).then(()=> {
        window.scrollTo(0, 0);
    });
  }
  }

  scrollToId(id: string) {
    // console.log("element id : ", id);
    this.service2.scrollToElementById(id);
  }


  /* COURSES NAVIGATION */
  navigateToCoursePage(url: string | UrlTree) {
    this.router.navigateByUrl(url);
    // this.router.navigate(['/us-history']);
  }



 
  toggleGif(hovered: boolean) {
    this.isHovered = hovered;
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


  // for countdown

  private subscription: Subscription | undefined;
  public countdownText: string = '';
  private targetDate: Date = new Date('2024-09-09T08:00:00')
  // private targetDate: Date = new Date(new Date().setHours(17, 0, 0, 0));

  days:any
  hour:any
  miniute:any
  second:any
  isCountdownOver: boolean = false;
  openForm: boolean = false;
  isloading: boolean = false;
  sendEmail:any;

  updateCountdown(): void {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;
  
    if (distance < 0) {
      this.countdownText = 'Countdown is over!';
      this.isCountdownOver = true;
      return;
    }else{
      this.isCountdownOver = false;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const formattedDays = this.formatTimeUnit(days);
      const formattedHours = this.formatTimeUnit(hours);
      const formattedMinutes = this.formatTimeUnit(minutes);
      const formattedSeconds = this.formatTimeUnit(seconds);
      this.days = formattedDays;
      this.hour = formattedHours;
      this.miniute = formattedMinutes;
      this.second = formattedSeconds;
    }
  
    
  }
  
  private formatTimeUnit(unit: number): string {
    return unit < 10 ? '0' + unit : unit.toString();
  }

  // openform(){
  //   this.openForm = !this.openForm
  // }
  choosedPlan:any;

  preEnroll(data:any){
    // window.open('https://buy.stripe.com/test_5kAdSpdiJcr8awEcMM', '_blank');
    // window.location.href = 'https://buy.stripe.com/test_5kAdSpdiJcr8awEcMM';
    this.openForm = !this.openForm
    this.choosedPlan = data
    console.log(data)
  }

  closeForm(){
    this.openForm = !this.openForm
    this.subjectform.reset()
  }
  closeSuccessPopup(){
    this.openSuccessPopup = !this.openSuccessPopup
  }
  submitForm(){
    if(this.subjectform.valid){
      console.log('valid')
      let pay = {
        "email":this.subjectform.value.email,
        "name":this.subjectform.value.firstName + ' ' + this.subjectform.value.lastName
      }
      this.sendEmail = this.subjectform.value.email
      this.isloading = true
      console.log(pay)
      this.service.sendwaitlistData(pay).subscribe((res:any)=>{
        console.log(res)
        if(res.statusCode == 200){
          this.isloading = false
          this.closeForm()
          if(this.choosedPlan == 'Silver'){
            // window.location.href = 'https://buy.stripe.com/test_5kAdSpdiJcr8awEcMM';
            // window.open('https://buy.stripe.com/test_cN201zdiJ4YGeMUaEI', '_blank');
            const email = encodeURIComponent(this.sendEmail); // Encode the email
            console.log(email)
            const platinumUrl = `https://buy.stripe.com/test_cN201zdiJ4YGeMUaEI?prefilled_email=${email}&client_reference_id=silver`;
            window.open(platinumUrl, '_blank');
          }else if(this.choosedPlan == 'Gold'){
            // window.open('https://buy.stripe.com/test_00g5lT4Md9eW8ow5km', '_blank');
            const email = encodeURIComponent(this.sendEmail); // Encode the email
            console.log(email)
            const platinumUrl = `https://buy.stripe.com/test_00g5lT4Md9eW8ow5km?prefilled_email=${email}&client_reference_id=gold`;
            window.open(platinumUrl, '_blank');
          }else{

            // window.open('https://buy.stripe.com/test_7sIdSp6Ul8aSgV25kn', '_blank');
            const email = encodeURIComponent(this.sendEmail); // Encode the email
            console.log(email)
            const platinumUrl = `https://buy.stripe.com/test_7sIdSp6Ul8aSgV25kn?prefilled_email=${email}&client_reference_id=platinum`;
            window.open(platinumUrl, '_blank');
          }
          
          this.openSuccessPopup = true
          setTimeout(()=>{
            this.openSuccessPopup = false
          },5000)
          
        }
      })
    }else{
      console.log('!valid')
      this.validateAllFormFields(this.subjectform)
    }
  }
  
  
  ngOnDestroy(): void {
    // this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    if (this.isBrowser) {
    this.service2.saveScrollPosition(this.scrollKey, window.scrollY);
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}