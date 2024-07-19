import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit ,OnDestroy{
  scrollKey: any;
  private isBrowser: boolean;
  constructor(private service : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
  private titleService: Title, private metaService: Meta) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.setTitle('Privacy Policy Page - Privacy Policy of Use');
    this.setMetaDescription('Privacy Policy Page - Description')
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
