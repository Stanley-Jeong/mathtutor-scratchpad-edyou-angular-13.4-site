import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edyous-ai',
  templateUrl: './edyous-ai.component.html',
  styleUrls: ['./edyous-ai.component.css']
})
export class EdyousAiComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateToBlog(){
    this.router.navigate(['/blog']);
  }

}
