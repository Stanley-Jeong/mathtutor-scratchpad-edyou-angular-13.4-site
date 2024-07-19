import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-edyous-ai',
  templateUrl: './edyous-ai.component.html',
  styleUrls: ['./edyous-ai.component.css']
})
export class EdyousAiComponent implements OnInit,OnDestroy {
  scrollKey: any;
  private isBrowser: boolean;
  constructor(private router:Router,private service : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
  private titleService: Title, private metaService: Meta) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.setTitle('AI is Reimagining the Future of Personalized Learning Page - of Use');
    this.setMetaDescription('AI is Reimagining the Future of Personalized Learning Page - Description')
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
