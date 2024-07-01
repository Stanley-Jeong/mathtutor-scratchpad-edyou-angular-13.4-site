import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorChangeService } from '../service/color-change.service';

@Component({
  selector: 'app-edyous-ai',
  templateUrl: './edyous-ai.component.html',
  styleUrls: ['./edyous-ai.component.css']
})
export class EdyousAiComponent implements OnInit,OnDestroy {
  scrollKey: any;
  constructor(private router:Router,private service : ColorChangeService) { }

  ngOnInit(): void {
  }

  navigateToBlog(){
    this.router.navigate(['/blog']);
  }

  ngOnDestroy(): void {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
  }
}
