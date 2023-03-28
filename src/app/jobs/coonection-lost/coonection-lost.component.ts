import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-coonection-lost',
  templateUrl: './coonection-lost.component.html',
  styleUrls: ['./coonection-lost.component.scss']
})
export class CoonectionLostComponent {
  constructor(private _authService:AuthServiceService,private cookieMethod:CookieService){}
  ngOnInit(){
    
    this.retryPage()
  }
  retryPage(){
    let token = this.cookieMethod.get('jwt_Token')
    this._authService.retryFunction(token)
  }
}
