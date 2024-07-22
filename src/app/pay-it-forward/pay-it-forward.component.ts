import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pay-it-forward',
  templateUrl: './pay-it-forward.component.html',
  styleUrls: ['./pay-it-forward.component.css']
})
export class PayItForwardComponent implements OnInit ,OnDestroy {
  scrollKey: any;
  private isBrowser: boolean;
  constructor(private service : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
  private titleService: Title, private metaService: Meta) {
    this.isBrowser = isPlatformBrowser(this.platformId);
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
