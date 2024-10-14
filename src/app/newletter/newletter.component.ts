import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newletter',
  templateUrl: './newletter.component.html',
  styleUrls: ['./newletter.component.css']
})
export class NewletterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.addHubSpotScript();
  }


  navigateToMain(){
    this.router.navigate(['/main']);
  }
  addHubSpotScript() {
   console.log('its tracking')
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'hs-script-loader';
    script.async = true;
    script.defer = true;
    script.src = '//js.hs-scripts.com/8174166.js';
    document.body.appendChild(script);
}
}
