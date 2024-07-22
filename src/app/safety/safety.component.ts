import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.css']
})
export class SafetyComponent implements AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  scrollKey: any;
  private isBrowser: boolean;
  constructor(private router: Router,private service : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
  private titleService: Title, private metaService: Meta) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
    this.setTitle('edYOU Safety - edYOU’s Commitment to a Secure Learning Environment');
    this.setMetaDescription('Learn about edYOU’s measures to ensure physical safety and a secure learning environment for all users.')
  }
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  setMetaDescription(description: string) {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  async ngAfterViewInit() {
    await this.navigateAndReplaceClass();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.complete();
    if (this.isBrowser) {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
    }
  }

  async navigateAndReplaceClass() {
    await this.router.navigateByUrl(this.router.url); 
    this.replaceClass("elementor-invisible", "");
  }

  private replaceClass(className: string, newClassName: string): void {
    if(this.isBrowser) {
    const elements = document.querySelectorAll("." + className);
    elements.forEach(element => {
      element.classList.remove(className);
    });
    }
  }
  

}
