import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(private cookieMethod:CookieService,private _router:Router){}
  logout(){
    this.cookieMethod.delete('jwt_Token')
    this._router.navigate(['/login'])
  }
}
