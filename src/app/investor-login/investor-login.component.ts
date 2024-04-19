import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-investor-login',
  templateUrl: './investor-login.component.html',
  styleUrls: ['./investor-login.component.css']
})
export class InvestorLoginComponent implements OnInit {

  url!:SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://investor.edyou.com/wp-login.php');
  }
  

}
