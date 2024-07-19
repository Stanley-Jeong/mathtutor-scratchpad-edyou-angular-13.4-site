import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-academic-integrity',
  templateUrl: './academic-integrity.component.html',
  styleUrls: ['./academic-integrity.component.css']
})
export class AcademicIntegrityComponent implements OnInit,OnDestroy {
  scrollKey: any;
  private isBrowser: boolean;
  constructor(private service : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
  private titleService: Title, private metaService: Meta) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.setTitle('Academic Integrity Page - Academic Integrity of Use');
    this.setMetaDescription('Academic Integrity Page - Description')
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
