import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ColorChangeService } from '../service/color-change.service';

@Component({
  selector: 'app-investor-login',
  templateUrl: './investor-login.component.html',
  styleUrls: ['./investor-login.component.css']
})
export class InvestorLoginComponent implements OnInit {
  scrollKey: any;
  url!:SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,private service : ColorChangeService
  ) { }
  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://investor.edyou.com/wp-login.php');
  }
  

  ngOnDestroy(): void {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
  }

}
