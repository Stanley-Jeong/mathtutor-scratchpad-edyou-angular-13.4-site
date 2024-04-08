import { Component } from '@angular/core';
import { NavigationStart, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   
  constructor(private router: Router) {
    // Subscribe to NavigationStart event
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        window.scrollTo(0, 0); // Scroll to the top of the page
      }
      if (this.router.url === '/terms'|| this.router.url === '/safety'|| this.router.url==='/privacy') {
        // Change background color to white
        document.body.style.backgroundColor = '#E7F9FF';
      } else{
        document.body.style.backgroundColor = '';
      }
    });
  }  

  }

