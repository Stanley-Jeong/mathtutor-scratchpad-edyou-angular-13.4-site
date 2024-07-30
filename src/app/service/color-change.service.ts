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

  // for scroll on top----------------------------------------------
  scrollPositions: { [key: string]: number } = {};

  saveScrollPosition(key: string, scrollY: number): void {
    this.scrollPositions[key] = scrollY;
  }

  getScrollPosition(key: string): number {
    return this.scrollPositions[key] || 0;
  }


  scrollToElementById(id: string) {
    const element = this.__getElementById(id);
    this.scrollToElement(element);
  }

  private __getElementById(id: string): HTMLElement {
    console.log("element id : ", id);
    const element = <HTMLElement>document.querySelector(`#${id}`);
    // const element = document.getElementById(id);
    return element;
  }

  scrollToElement(element: HTMLElement) {
    element.scrollIntoView({ behavior: "smooth" });
  }


}