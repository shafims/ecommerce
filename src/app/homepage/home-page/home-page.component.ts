import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private _title: Title,private cookieMethod:CookieService,private _router:Router){}
  ngOnInit(){
    this._title.setTitle("Jobby App/#/Home")
  }
  logout(){
    this.cookieMethod.delete('jwt_Token')
    this._router.navigate(['/login'])
  }
}
