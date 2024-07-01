import { Component, AfterViewInit, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ColorChangeService } from '../service/color-change.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements AfterViewInit, OnDestroy, OnInit {
  private ngUnsubscribe = new Subject();
  scrollKey: any;
  constructor(
    private router: Router,private service : ColorChangeService) {
      
  }

  ngOnInit(): void {
  }

  navigateToSafety(){
    this.router.navigate(['/safety']);
  }

  async ngAfterViewInit() {
    this.navigateAndReplaceClass();
  }

  ngOnDestroy(): void {
    // this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);

  }

  async navigateAndReplaceClass() {
    await this.router.navigateByUrl(this.router.url); // Trigger navigation event
    this.replaceClass("elementor-invisible", "");
  }

  private replaceClass(className: string, newClassName: string): void {
    const elements = document.querySelectorAll("." + className);
    elements.forEach(element => {
      
      element.classList.remove(className);
    });
  }

  toggleActive(tabId: string) {
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
