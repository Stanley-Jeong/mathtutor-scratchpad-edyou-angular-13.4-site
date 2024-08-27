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

  courseUrl: string;
  currentCourse: any;

  constructor(private router: Router, private service : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
  private titleService: Title, private metaService: Meta) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log(this.router.url)

    this.courseUrl = this.router.url
    this.currentCourse = courses.find((course) => course.id === this.courseUrl)
    console.log("CURRENT COURSE", this.currentCourse)
  }
  


  ngOnInit(): void {
    this.setTitle('Pay It Forward - edYOU’s Commitment to Education');
    this.setMetaDescription('Discover edYOU’s Pay It Forward initiative, supporting educational growth and community development through innovative programs.')
  }
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  setMetaDescription(description: string) {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
    }
  }

}
