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
  }


  navigateToMain(){
    this.router.navigate(['/main']);
  }

}
