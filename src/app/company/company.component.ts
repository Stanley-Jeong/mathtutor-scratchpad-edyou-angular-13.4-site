import { Component, AfterViewInit, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements AfterViewInit, OnDestroy, OnInit {
  private ngUnsubscribe = new Subject();

  constructor(
    private router: Router) {
      
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
