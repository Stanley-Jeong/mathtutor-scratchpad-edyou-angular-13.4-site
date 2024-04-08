import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorChangeService {

  colorChange: Subject<string> = new Subject<string>();

  constructor() { }

  setColor(color: string) {
    this.colorChange.next(color);
  }

}
