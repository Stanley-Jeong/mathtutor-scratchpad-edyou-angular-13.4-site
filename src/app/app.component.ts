import { Component } from '@angular/core';
import { NavigationStart, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // componentActive: boolean = false;
  // routerSubscription: Subscription;
   
  constructor(private router: Router) {

    // Subscribe to NavigationStart event
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        window.scrollTo(0, 0); // Scroll to the top of the page
      }
      if (this.router.url.includes('/safety') || this.router.url === '/terms'|| this.router.url==='/privacy') {
        // Change background color to white
        document.body.style.backgroundColor = '#E7F9FF';
      } else{
        document.body.style.backgroundColor = '';
      }
    });

    // this.routerSubscription = this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     // Check if the current route corresponds to this component
    //     this.componentActive = this.router.isActive('/my-component', true);
    //   }
    // });
  }
  

  }

