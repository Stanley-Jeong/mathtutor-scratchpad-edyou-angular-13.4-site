import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sc',
  templateUrl: './sc.component.html',
  styleUrls: ['./sc.component.css']
})
export class ScComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    //this.cdr.detach(); 
   // window.location.href = 'https://sc.edyou.com/';
  }

}
