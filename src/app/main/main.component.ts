import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../service/user.service';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit,OnDestroy {

  private ngUnsubscribe = new Subject();
  scrollKey: any;
  private isBrowser: boolean;
  constructor(private router: Router,private service :UserService ,private service2 : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
  private titleService: Title, private metaService: Meta) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.service.getIp().subscribe((res:any)=>{
      console.log(res,"my ip----------------------------------------------")
    })
    // let id = localStorage.getItem('sessionId') 
    // console.log(id,'regettttttttttttttttttttttttttttttttttttttttt')
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

  ngOnDestroy(): void {
    // this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    if (this.isBrowser) {
    this.service2.saveScrollPosition(this.scrollKey, window.scrollY);
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

}