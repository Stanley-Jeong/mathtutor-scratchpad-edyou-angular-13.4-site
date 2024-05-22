import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private ngUnsubscribe = new Subject();

  constructor(private router: Router,private service :UserService) {
    this.service.getIp().subscribe((res:any)=>{
      console.log(res,"my ip----------------------------------------------")
    })
    // let id = localStorage.getItem('sessionId') 
    // console.log(id,'regettttttttttttttttttttttttttttttttttttttttt')
  }

  async ngAfterViewInit() {
    this.navigateAndReplaceClass();
    // Autoplay the video by triggering a play event
    const videoIframe= document.getElementById('widget2') as HTMLIFrameElement;
    if (videoIframe) {
      console.log('hey');
      videoIframe.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*');
      videoIframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  }

  ngOnDestroy(): void {
    // this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  async navigateAndReplaceClass() {
    await this.router.navigateByUrl(this.router.url); // Trigger navigation event
    this.replaceClass("elementor-invisible", "");
  }

  private replaceClass(className: string, newClassName: string): void {
    const elements = document.querySelectorAll("." + className);
    elements.forEach(element => {
      
      element.classList.remove(className);
      // element.className = newClassName; // Directly assign empty string
    });
  }

  ngOnInit(): void {
    const image1 = document.getElementById('image1') as HTMLImageElement;
    const image2 = document.getElementById('image2') as HTMLImageElement;
    const image3 = document.getElementById('image3') as HTMLImageElement;
    const images: HTMLImageElement[] = [image1, image2, image3];

    this.startImageRotation(images);
  }

  startImageRotation(images: HTMLImageElement[]): void {
    let currentImageIndex = 0;

    // Start the animation
    this.fadeIn(images[currentImageIndex]);

    setInterval(() => {
      this.fadeOut(images[currentImageIndex]);
      currentImageIndex = (currentImageIndex + 1) % images.length; // This ensures looping
      this.fadeIn(images[currentImageIndex]);
    }, 5000); // Change image every 5 seconds
  }

  fadeIn(imageElement: HTMLImageElement): void {
    imageElement.classList.add('fade-in');
    setTimeout(() => {
      this.fadeOut(imageElement);
    }, 5000); // Fade out after 5 seconds
  }

  fadeOut(imageElement: HTMLImageElement): void {
    imageElement.classList.remove('fade-in');
    imageElement.classList.add('fade-out');
    setTimeout(() => {
      imageElement.classList.remove('fade-out');
    }, 2000); // Remove fade-out class after animation completes
  }

  navigateToSafety() {
    this.router.navigate(['/safety']).then(()=> {
      // window.location.reload();
    })
  }    
  navigateToMain(){
    this.router.navigate(['/main']);
  }

  navigateToLabs() {
    this.router.navigate(['/labs']).then(()=> {
      // window.location.reload();
    })
  }

  navigateToCompany(){
    this.router.navigate(['/company']);
  }

  navigateToEdyousAi(){
    this.router.navigate(['/how-edyous-ai-is-reimagining-the-future-of-personalized-learning']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  navigateToRevolutionizingEducation(){
    this.router.navigate(['/revolutionizing-education-with-edyou-bridging-the-post-pandemic-learning-gap']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  navigateToPayItForward() {
    this.router.navigate(['/pay-it-forward']).then(()=> {
        window.scrollTo(0, 0);
    });
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event:any){
    console.log($event);
    console.log("scrolling");
    this.service.getIp().subscribe((res:any)=>{
      console.log(res.ip,"my ip----------------------------------------------")
      localStorage.setItem("userIp2", JSON.stringify(res.ip));
    })
  } 

  

  // @ViewChild('inside')inside!: ElementRef;

  // @HostListener('document:click', ['$event'])
  // clickout(event: any) {
  //   if (this.inside.nativeElement.contains(event.target)) {
  //     console.log('inside')
  //     this.service.getIp().subscribe((res:any)=>{
  //       console.log(res.ip,"my ip----------------------------------------------")
  //       localStorage.setItem("userIp2", JSON.stringify(res.ip));
  //     })
  //   } else {
     
  //     console.log('outside')
  //     // this.onCloseHandled()
  //   }
  // }
  @HostListener('window:click', ['$event']) onScrollEvent2($event:any){
    console.log($event);
    console.log("clicked");
    this.service.getIp().subscribe((res:any)=>{
      console.log(res.ip,"my ip----------------------------------------------")
      localStorage.setItem("userIp2", JSON.stringify(res.ip));
    })
  } 
}