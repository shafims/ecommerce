import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent {

  constructor(private _title: Title,private _authService:AuthServiceService,private _router:Router,private cookieMethod:CookieService,private _activateRoute:ActivatedRoute,private _spinner: NgxSpinnerService){}
  jobInfoObj:any;
  statusCode:any;
  
  ngOnInit(){
    this.gettingJobFun() 
  }

  gettingJobFun(){
    let JobToken
    this._spinner.show()
    this._activateRoute.paramMap.subscribe(data=>{
      JobToken = data.get('id') 
      // console.log("hello component",data.get('id'))
    })
    this._title.setTitle(`Jobby App/#/Jobs/${JobToken}`)
    this._authService.getJobInfo(JobToken).subscribe(data=>{
      this.jobInfoObj = data
      this.statusCode = 200;
      this._spinner.hide()
      // console.log(this.jobInfoObj)
    },
    error=>{
      if(error['status'] === 401){
        this.statusCode = error['status']
        this._spinner.hide()
      }
    }
    
    )
  }

  similarJobFun(jobid:any){
    this._spinner.show()
    this._authService.getJobInfo(jobid).subscribe(data=>{
      this.jobInfoObj = data
      this.statusCode = 200;
      this._spinner.hide()
      // console.log(this.jobInfoObj)
    },
    error=>{
      if(error['status'] === 401){
        this.statusCode = error['status']
      }
    }
    
    )
  }

  logout(){
    this.cookieMethod.delete('jwt_Token')
    this._router.navigate(['/login'])
  }

}
