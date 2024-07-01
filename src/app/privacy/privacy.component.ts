import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColorChangeService } from '../service/color-change.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit ,OnDestroy{
  scrollKey: any;
  constructor(private service : ColorChangeService) { }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
  }

}
