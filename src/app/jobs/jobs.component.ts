import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
  jobsArray = []
  resultedData = [] // storing the data for filtering purpose
  userText:any="";
  statusCode:any;
  storingUserInfo:any={};

  filteredForm = new FormGroup({
    FullTime : new FormControl(),
    PartTime : new FormControl(),
    Freelance : new FormControl(),
    Internship : new FormControl(),
    PackageLPA : new FormControl()
  })
  constructor(private _title: Title,private _AuthServiceService:AuthServiceService,private _router:Router,private cookieMethod:CookieService,private _spinner: NgxSpinnerService){}
  ngOnInit(){
    // console.log(this.cookieMethod.get('jwt_Token'))
      this._spinner.show()
      this._title.setTitle("jobby App/All Jobs")
      this._AuthServiceService.getJobs().subscribe(data=>{
        this.jobsArray =  Object.values(data)[0]
        this.resultedData = Object.values(data)[0]
        this.statusCode = 200;
        this._spinner.hide()
      },
      error => {
        if(error['status'] === 401){
          this.statusCode = error['status']
          this._spinner.hide()
        }
        });
        this._AuthServiceService.getProfileInfo().subscribe(data=>{
          console.log(Object.values(data)[0])
          this.storingUserInfo = Object.values(data)[0]
        },error => {
          if(error['status'] === 401){
            this.statusCode = error['status']
          }
        }
        )
      
  }
  searchValue(data:any){
    if(data.length === 0){
      alert("Please Enter job role")
    }
    else{
      let filteredArray
      let sub1C = data.substring(1,data.length - 9).toLocaleLowerCase()
      let sub1 = data.substring(0,data.length - 9).substring(0,1)
      let sub2 = data.substring(data.length - 9,data.length).substring(0,2)
      let sub2C = data.substring(data.length - 7,data.length).toLocaleLowerCase()
      let final_string = sub1.concat(sub1C).concat(sub2.concat(sub2C))
      // this.userText = final_string
      // console.log(final_string) this will give final entire string
      filteredArray = this.resultedData.filter(eachItem=>{
        return eachItem['title'] === final_string
      })
      this.jobsArray = filteredArray
    }
    
  }
  resetForm(){
    this.filteredForm.reset()
  }
  onSubmit(){

    let userfilterForm = this.filteredForm.value
    let emp_type = [];
    let PackageText
    
    
    if(userfilterForm['FullTime'] != null && userfilterForm['FullTime'] === true){
        emp_type.push("FULLTIME")
      // FullTimeText = "FULLTIME"
    }
    if(userfilterForm['PartTime'] != null && userfilterForm['PartTime'] === true){
      emp_type.push("PARTTIME")
      // PartTimeText = "PARTTIME"
    }
    if(userfilterForm['Internship'] != null && userfilterForm['Internship'] === true){
      emp_type.push("INTERNSHIP")
      // InternshipText = "INTERNSHIP"
    }
    if(userfilterForm['Freelance'] != null && userfilterForm['Freelance'] === true){
      emp_type.push("FREELANCE")
      // FreelanceText = "FREELANCE"
    }
    if(userfilterForm['PackageLPA'] != null){
      PackageText = userfilterForm['PackageLPA']
    }

    // console.log("hello surendra==========>",emp_type)
    // console.log(userfilterForm)

    let newObj ={
      EmpType:emp_type,
      PackageTextValue:PackageText
    }
    //  Line 96 to 100 this observable will give testing result
    // this._AuthServiceService.getFilteredJobs(this.userText,newObj).subscribe(data=>{
    //     this.jobsArray = Object.values(data)[0]
    //     this._spinner.hide()
    //     console.log(Object.values(data)[0])
    // })

    if(this.userText.length === 0 && emp_type.length === 0 && PackageText === undefined){
    alert("Please add some filter you can see the results")
    }
    else{
    this._spinner.show()
    this._AuthServiceService.getFilteredJobs(this.userText,newObj).subscribe(data=>{
        this.jobsArray = Object.values(data)[0]
        this._spinner.hide()
        console.log(Object.values(data)[0])
    },
    error => {
        if(error['status'] === 401){
        this.statusCode = error['status']
        this._spinner.hide()
        }
        }
    )
    }
  }
  logout(){
    this.cookieMethod.delete('jwt_Token')
    this._router.navigate(['/login'])
  }
  
}
