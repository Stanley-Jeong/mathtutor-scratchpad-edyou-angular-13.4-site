import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColorChangeService } from '../service/color-change.service';

@Component({
  selector: 'app-pay-it-forward',
  templateUrl: './pay-it-forward.component.html',
  styleUrls: ['./pay-it-forward.component.css']
})
export class PayItForwardComponent implements OnInit ,OnDestroy {
  scrollKey: any;
  constructor(private service : ColorChangeService) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
  }

}
