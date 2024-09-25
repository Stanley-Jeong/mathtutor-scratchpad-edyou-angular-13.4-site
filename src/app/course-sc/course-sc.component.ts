
import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { courses } from '../courses-data';
@Component({
  selector: 'app-course-sc',
  templateUrl: './course-sc.component.html',
  styleUrls: ['./course-sc.component.css']
})
export class CourseScComponent implements OnInit {

  scrollKey: any;
  private isBrowser: boolean;
  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef;
 // courseId: string;
  currentCourse: any;

  constructor(private router: Router, private service : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
  private titleService: Title, private metaService: Meta,) {
    this.isBrowser = isPlatformBrowser(this.platformId);
   // this.courseId = this.router.url.slice(1)
    const urlSegments = this.router.url.split('/');
    let courseIdnew = urlSegments[2];
    this.currentCourse = courses.find((course) => course.id === courseIdnew)
    console.log(this.currentCourse,courseIdnew,urlSegments)
  }
  

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.isBrowser) {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
    }
  }
  currentIndex = 0;

  goTo_mainPage(){
    this.router.navigate(['/sc']).then(()=> {
      window.scrollTo(0, 0);
    });
  }

  gotoPreenroll(id: string){
    this.router.navigate(['/sc']).then(()=> {
      window.scrollTo(0, 0);
      setTimeout(()=>{
        this.service.scrollToElementById(id)
      },500)
      
    });
  }
  

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.currentCourse.images.length - 1;
    this.updateSlidePosition();
    this.updateButtonStates();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex < this.currentCourse.images.length - 1) ? this.currentIndex + 1 : 0;
    this.updateSlidePosition();
    this.updateButtonStates();
  }
  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateSlidePosition();
  }
  private updateSlidePosition() {
    const offset = -this.currentIndex * 100;
    this.carouselWrapper.nativeElement.style.transition = 'none'; // Disable transition during snap
    this.carouselWrapper.nativeElement.style.transform = `translateX(${offset}%)`;

    // Force reflow to ensure transition works after update
    this.carouselWrapper.nativeElement.offsetWidth;

    // Enable transition after a delay
    setTimeout(() => {
      this.carouselWrapper.nativeElement.style.transition = 'transform 0.5s ease-in-out';
    }, 20);
  
  }
 
  updateButtonStates() {
    // Get the buttons
    const prevButton = document.querySelector('.carousel-button.prev') as HTMLButtonElement;
    const nextButton = document.querySelector('.carousel-button.next') as HTMLButtonElement;

    // Disable or enable buttons based on the current index
    if (prevButton) {
      prevButton.disabled = this.currentIndex === 0;
    }
    if (nextButton) {
      nextButton.disabled = this.currentIndex === this.currentCourse.length - 1;
    }
  }
}


