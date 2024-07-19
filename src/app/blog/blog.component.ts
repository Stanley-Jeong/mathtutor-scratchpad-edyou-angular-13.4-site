import { Component, AfterViewInit, OnDestroy, OnInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  scrollKey: any;
  private isBrowser: boolean;
  constructor(
    private router: Router,private service : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title, private metaService: Meta
  ) { this.isBrowser = isPlatformBrowser(this.platformId);}

  ngOnInit(): void {
    this.setTitle('Blog Page - Blog of Use');
    this.setMetaDescription('Blog Page - Description')
  }
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  setMetaDescription(description: string) {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  async ngAfterViewInit() {
    this.navigateAndReplaceClass();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.complete();
    if (this.isBrowser) {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
    }
  }

  async navigateAndReplaceClass() {
    await this.router.navigateByUrl(this.router.url); // Trigger navigation event
    this.replaceClass("elementor-invisible", "");
  }

  private replaceClass(className: string, newClassName: string): void {
    if(this.isBrowser) {
    const elements = document.querySelectorAll("." + className);
    elements.forEach(element => {
      element.classList.remove(className);
      // element.className = newClassName; // Directly assign empty string
    });
    }
  }

  navigateToEdyousAi(){
    this.router.navigate(['/how-edyous-ai-is-reimagining-the-future-of-personalized-learning']);
  }

  navigateToRevolutionizingEducation(){
    this.router.navigate(['/revolutionizing-education-with-edyou-bridging-the-post-pandemic-learning-gap']);
  }

}
