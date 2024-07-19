import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-investor-login',
  templateUrl: './investor-login.component.html',
  styleUrls: ['./investor-login.component.css']
})
export class InvestorLoginComponent implements OnInit {
  scrollKey: any;
  url!:SafeResourceUrl;
  private isBrowser: boolean;
  constructor(
    private sanitizer: DomSanitizer,private service : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title, private metaService: Meta
  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  ngOnInit(): void {
    this.setTitle('Investor Login Page - Investor Login of Use');
    this.setMetaDescription('Investor Login Page - Description');
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://investor.edyou.com/wp-login.php');
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
