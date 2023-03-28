import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  constructor(private _title: Title,private authService:AuthServiceService,private cookieService:CookieService,private router:Router){}

  userForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })
  error_msg:any;
  status_code:any;

  ngOnInit(){
    this._title.setTitle("Jobby App/#/login")
  }

  onSubmit(){
    let jwtToken
    this.authService.getJwt(this.userForm.value).subscribe(data=>{
      this.status_code = 200;
      jwtToken =  Object.values(data)[0]
      this.cookieService.set('jwt_Token',jwtToken)
      this.router.navigate(['/'])
    },
    error=>{
      if(error['status'] === 400){
        this.status_code = error['error']['status_code']
        this.error_msg = error['error']['error_msg']
      }
    }
    )
    }

  

}
