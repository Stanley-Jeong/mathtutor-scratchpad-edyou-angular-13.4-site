import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revolutionizing-education',
  templateUrl: './revolutionizing-education.component.html',
  styleUrls: ['./revolutionizing-education.component.css']
})
export class RevolutionizingEducationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToBlog(){
    this.router.navigate(['/blog']);
  }

}