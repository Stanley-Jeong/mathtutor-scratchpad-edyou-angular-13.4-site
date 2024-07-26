import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-revolutionizing-education',
  templateUrl: './revolutionizing-education.component.html',
  styleUrls: ['./revolutionizing-education.component.css']
})
export class RevolutionizingEducationComponent implements OnInit,OnDestroy {
  scrollKey: any;
  private isBrowser: boolean;
  constructor(
    private router: Router,private service : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title, private metaService: Meta
  ) {this.isBrowser = isPlatformBrowser(this.platformId); }

  ngOnInit(): void {
    this.setTitle('Revolutionizing Education with edYOU | Bridging the Post-Pandemic Learning Gap');
    this.setMetaDescription('Discover how edYOU is addressing the post-pandemic learning gap with innovative technology, personalized AI assistance, and seamless integration to help students thrive.')
  }
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  setMetaDescription(description: string) {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  navigateToBlog(){
    this.router.navigate(['/blog']);
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
    }
  }

}