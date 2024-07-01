import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ColorChangeService } from '../service/color-change.service';

@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.css']
})
export class SafetyComponent implements AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  scrollKey: any;

  constructor(
    private router: Router,private service : ColorChangeService
    
  ) { }


  async ngAfterViewInit() {
    await this.navigateAndReplaceClass();
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
      // element.className = newClassName; // Directly assign empty string
    });



    // //addtional
    // const elementsLight = document.querySelectorAll("." + "light");
    // elementsLight.forEach(element => {
      
    //   element.classList.remove("light");
    //   // element.className = newClassName; // Directly assign empty string
    // });
  }
  

}
