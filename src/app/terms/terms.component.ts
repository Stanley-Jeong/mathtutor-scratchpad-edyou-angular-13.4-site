import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../service/header.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor(
    // private headerService: HeaderService
  ) { }

  ngOnInit(): void {}

}
