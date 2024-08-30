import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { courses } from '../courses-data';


@Component({
  selector: 'course-template',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CoursePageComponent implements OnInit ,OnDestroy {
  scrollKey: any;
  private isBrowser: boolean;

  courseId: string;
  currentCourse: any;

  constructor(private router: Router, private service : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
  private titleService: Title, private metaService: Meta,) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.courseId = this.router.url.slice(1)
    this.currentCourse = courses.find((course) => course.id === this.courseId)
    console.log(this.currentCourse)
  }
  

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.isBrowser) {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
    }
  }
  currentIndex = 0;

  goTo_mainPage(){
    this.router.navigate(['/']).then(()=> {
      window.scrollTo(0, 0);
    });
  }

  gotoPreenroll(id: string){
    this.router.navigate(['/']).then(()=> {
      window.scrollTo(0, 0);
      setTimeout(()=>{
        this.service.scrollToElementById(id)
      },500)
      
    });
  }
  

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.currentCourse.images.length - 1;
    this.updateSlidePosition();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex < this.currentCourse.images.length - 1) ? this.currentIndex + 1 : 0;
    this.updateSlidePosition();
  }
  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateSlidePosition();
  }
  private updateSlidePosition() {
    const offset = -this.currentIndex * 100;
    document.querySelector('.carousel-wrapper')?.setAttribute('style', `transform: translateX(${offset}%)`);
  }
}
