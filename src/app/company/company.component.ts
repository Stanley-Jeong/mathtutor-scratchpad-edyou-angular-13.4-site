import { Component, AfterViewInit, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements AfterViewInit, OnDestroy, OnInit {
  private ngUnsubscribe = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef) { }

  ngOnInit(): void {
    
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
      // element.className = newClassName; // Directly assign empty string
    });
  }
}
