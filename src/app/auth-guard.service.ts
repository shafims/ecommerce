import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private cookieToken:CookieService,private _router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    if(this.cookieToken.get('jwt_Token') === ""){
      this._router.navigate(["/login"])
      return false
    }
    else{ 
      return true
    }
  }
  
}
