import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor() { }

  success(title = '', text = '') {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      timer: 2000
    })
  }

  info(title = '', text = '', timer = 2000) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      timer: timer
    })
  }

  error(title = '', text = '', timer = 4000, html = '') {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      html: html,
      timer: timer
    })
  }

  warning(title = '', text = '') {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      timer: 3000
    })
  }

  default(data:any) {
    Swal.fire(data)
  }

  
}

