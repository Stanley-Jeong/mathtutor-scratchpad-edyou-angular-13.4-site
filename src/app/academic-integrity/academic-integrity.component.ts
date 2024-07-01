import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColorChangeService } from '../service/color-change.service';

@Component({
  selector: 'app-academic-integrity',
  templateUrl: './academic-integrity.component.html',
  styleUrls: ['./academic-integrity.component.css']
})
export class AcademicIntegrityComponent implements OnInit,OnDestroy {
  scrollKey: any;
  constructor(private service : ColorChangeService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.service.saveScrollPosition(this.scrollKey, window.scrollY);
  }


}
