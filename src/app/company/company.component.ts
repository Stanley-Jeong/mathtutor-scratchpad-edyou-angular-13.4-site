import { Component, AfterViewInit, ViewChild, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ColorChangeService } from '../service/color-change.service';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements AfterViewInit, OnDestroy, OnInit {
  private ngUnsubscribe = new Subject();
  scrollKey: any;
  private isBrowser: boolean;
  constructor(private router: Router,private service : ColorChangeService, @Inject(PLATFORM_ID) private platformId: Object,
  private titleService: Title, private metaService: Meta) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.setTitle('Company Page - Company of Use');
    this.setMetaDescription('Company Page - Description')
  }
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  setMetaDescription(description: string) {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  navigateToSafety(){
    this.router.navigate(['/safety']);
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

  toggleActive(tabId: string) {
    if(this.isBrowser) {
    const tabContent = document.getElementById(`ae-tab-content-${tabId}`);
    const tabTitle = document.getElementById(`ae-tab-title-${tabId}`);
    if (tabContent && tabTitle) {
      tabContent.classList.toggle('ae-active');
      tabTitle.classList.toggle('ae-active');
      const iconElement = tabTitle.querySelector('.ae-accordion-icon-closed i');
      if (iconElement) {
        iconElement.classList.toggle('fa-caret-down');
        iconElement.classList.toggle('fa-caret-right');
      }
    }
    }
  }
}
