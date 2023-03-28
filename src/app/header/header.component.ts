import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private cookieMethod:CookieService,private _router:Router){}
  logout(){
    this.cookieMethod.delete('jwt_Token')
    // console.log("jsdljnfkjsdf----------->",this.cookieMethod.get('jwt_Token'))
    this._router.navigate(['/login'])
  }
}
