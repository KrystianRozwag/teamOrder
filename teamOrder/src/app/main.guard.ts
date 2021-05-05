import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  jwtHelper = new JwtHelperService();
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = String(localStorage.getItem("session_token"))
    if(token == ''){
      return false;
    }else {    
      if(this.jwtHelper.isTokenExpired(token)){
        return false;
      }else {
        return true;
      }
    }
  }
  
}
