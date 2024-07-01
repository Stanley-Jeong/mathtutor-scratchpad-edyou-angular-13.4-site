import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorChangeService } from '../service/color-change.service';

@Component({
  selector: 'app-revolutionizing-education',
  templateUrl: './revolutionizing-education.component.html',
  styleUrls: ['./revolutionizing-education.component.css']
})
export class RevolutionizingEducationComponent implements OnInit,OnDestroy {
  scrollKey: any;
  constructor(
    private router: Router,private service : ColorChangeService
  ) { }

  ngOnInit(): void {
  }

  navigateToBlog(){
    this.router.navigate(['/blog']);
  }

  ngOnDestroy(): void {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
  }

}