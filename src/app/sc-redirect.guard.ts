import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScRedirectGuard implements CanActivate {

  canActivate(): boolean {
    window.location.href = 'https://sc.edyou.com/';  // Redirect to the external URL
    return false;  // Prevent the route from activating
  }
  
}
