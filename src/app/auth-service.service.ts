import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient:HttpClient, private cookieMethod:CookieService,private _activateRoute:ActivatedRoute) { }

  jobsArray = []
  getJwt(userForm:any){
    let Api = "https://apis.ccbp.in/login"
    let headers = userForm
    return this.httpClient.post(Api,JSON.stringify(headers))
  }

  getJobs(){
    let Api = "https://apis.ccbp.in/jobs"
    let otpions = {
      headers:{
        Authorization: `Bearer ${this.cookieMethod.get('jwt_Token')}`,
      },
      method:'GET'
    }
    return this.httpClient.get(Api,otpions)
    // this.httpClient.get(Api,otpions).subscribe(data=>{
    //   this.jobsArray = Object.values(data)[0]
    //   console.log(this.jobsArray)
    //   return this.jobsArray
    // })
    // return ({
    //   "status":'Success',
    //   "jobs":this.jobsArray,
    //   "message":"Successfully Jobs Fetched"
    // })
  }

  getProfileInfo(){
    let otpions = {
      headers:{
        Authorization: `Bearer ${this.cookieMethod.get('jwt_Token')}`,
      },
      method:'GET'
    }
    let Api = "https://apis.ccbp.in/profile"
    return this.httpClient.get(Api,otpions)
  }
  
  getJobInfo(jobId:any){
    let Api = `https://apis.ccbp.in/jobs/${jobId}`
    let otpions = {
      headers:{
        Authorization: `Bearer ${this.cookieMethod.get('jwt_Token')}`,
      },
      method:'GET'
    }
    return this.httpClient.get(Api,otpions)
  }

  retryFunction(tokenId:any){
    if(this._activateRoute.snapshot.firstChild?.params['id'] === undefined){
      return this.getJobs()
    }
    else{
      return this.getJobInfo(tokenId)
    }
    // console.log(this._activateRoute.snapshot.firstChild?.params['id'])
    // this will gives jobId if available or else it will give undefined
  }

  getFilteredJobs(SearchedValue:any,filterdObj:any){
    let emp_typeValue;
    let ctcValue;
    let userValue = SearchedValue
    if(userValue.length === 0){ // heare i'm checking forming the emp_typeValue array and ctc value based on without uservalue
      if(filterdObj['EmpType'].length === 0){
           ctcValue = filterdObj['PackageTextValue'].slice(0,2) * 100000
      }
      else if(filterdObj['PackageTextValue'] === undefined){
          if(filterdObj['EmpType'].length === 1){
              emp_typeValue = filterdObj['EmpType'][0]
          }
          else if(filterdObj['EmpType'].length === 2){
            emp_typeValue = `${filterdObj['EmpType'][0]},${filterdObj['EmpType'][1]}`
          }
          else if(filterdObj['EmpType'].length === 3){
            emp_typeValue = `${filterdObj['EmpType'][0]},${filterdObj['EmpType'][1]},${filterdObj['EmpType'][2]}`
          }
          else{
            emp_typeValue = `${filterdObj['EmpType'][0]},${filterdObj['EmpType'][1]},${filterdObj['EmpType'][2]},${filterdObj['EmpType'][3]}`
          }
      }
      else{
        if(filterdObj['EmpType'].length === 1){
          emp_typeValue = filterdObj['EmpType'][0]
        }
        else if(filterdObj['EmpType'].length === 2){
          emp_typeValue = `${filterdObj['EmpType'][0]},${filterdObj['EmpType'][1]}`
        }
        else if(filterdObj['EmpType'].length === 3){
          emp_typeValue = `${filterdObj['EmpType'][0]},${filterdObj['EmpType'][1]},${filterdObj['EmpType'][2]}`
        }
        else{
          emp_typeValue = `${filterdObj['EmpType'][0]},${filterdObj['EmpType'][1]},${filterdObj['EmpType'][2]},${filterdObj['EmpType'][3]}`
        }
        ctcValue = filterdObj['PackageTextValue'].slice(0,2) * 100000

      }
    }
    else{ // heare i'm forming the emp_typeValue array and ctc value based on with uservalue
      if(filterdObj['EmpType'].length > 0 && filterdObj['PackageTextValue'] != undefined && userValue.length > 0){
        ctcValue = filterdObj['PackageTextValue'].slice(0,2) * 100000

        if(filterdObj['EmpType'].length === 1){
          emp_typeValue = filterdObj['EmpType'][0]
        }
        else if(filterdObj['EmpType'].length === 2){
          emp_typeValue = `${filterdObj['EmpType'][0]},${filterdObj['EmpType'][1]}`
        }
        else if(filterdObj['EmpType'].length === 3){
          emp_typeValue = `${filterdObj['EmpType'][0]},${filterdObj['EmpType'][1]},${filterdObj['EmpType'][2]}`
        }
        else{
          emp_typeValue = `${filterdObj['EmpType'][0]},${filterdObj['EmpType'][1]},${filterdObj['EmpType'][2]},${filterdObj['EmpType'][3]}`
        }
        // console.log("Hello bug-=============>",emp_typeValue)
      }
      else if((filterdObj['PackageTextValue'] === undefined || filterdObj['EmpType'].length > 0) && userValue.length > 0){
          if(filterdObj['EmpType'].length === 1){
              emp_typeValue = filterdObj['EmpType'][0]
          }
          else if(filterdObj['EmpType'].length === 2){
            emp_typeValue = `${filterdObj['EmpType'][0]},${filterdObj['EmpType'][1]}`
          }
          else if(filterdObj['EmpType'].length === 3){
            emp_typeValue = `${filterdObj['EmpType'][0]},${filterdObj['EmpType'][1]},${filterdObj['EmpType'][2]}`
          }
          else{
            emp_typeValue = `${filterdObj['EmpType'][0]},${filterdObj['EmpType'][1]},${filterdObj['EmpType'][2]},${filterdObj['EmpType'][3]}`
          }
      }
      else{
        ctcValue = filterdObj['PackageTextValue'].slice(0,2) * 100000       
      }
    }
    return this.ApisFunction(userValue,emp_typeValue,ctcValue,filterdObj)


    // ple: https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=frontend engineer
    // let testApi = `https://apis.ccbp.in/jobs?employment_type=FREELANCE,INTERNSHIP&minimum_package=4000000&search=frontend engineer`
    // let otpions = {
    //       headers:{
    //         Authorization: `Bearer ${this.cookieMethod.get('jwt_Token')}`,
    //       },
    //       method:'GET'
    //     }
    //     return  this.httpClient.get(testApi,otpions)


  }

  /*
    testcase(withoutSearchedValue)(this will give all type of role jobs):
    ----> only with EMT successfull getting the data
    ----> only with CTC successfull getting the data
    ----> with CTC AND EMT successfull getting the data
  */
 /*
    testcases(withSearchedValue)(this will give some set of resulted jobs bcz it depends on searchedValue):
     ----> only with EMT + SearchText successfull getting the data
    ----> only with CTC + SearchText successfull getting the data
    ----> with CTC AND EMT AND SearchText successfull getting the data
   */ 

  ApisFunction(SearchedValue:any,emp_typeValue:any,ctcValue:any,filterdObj:any){
    
    let userValue = SearchedValue;
    let Api1 = `https://apis.ccbp.in/jobs?employment_type=${emp_typeValue}&minimum_package=${ctcValue}`
    let Api2 = `https://apis.ccbp.in/jobs?employment_type=${emp_typeValue}&minimum_package=${ctcValue}&search=${userValue}`
    let Api3 =  `https://apis.ccbp.in/jobs?employment_type=${emp_typeValue}`
    let Api4 =  `https://apis.ccbp.in/jobs?minimum_package=${ctcValue}`
    let Api5 =  `https://apis.ccbp.in/jobs?minimum_package=${ctcValue}&search=${userValue}`
    let Api6 =  `https://apis.ccbp.in/jobs?employment_type=${emp_typeValue}&search=${userValue}`

    if(userValue.length === 0){ // this condition will check without search value 
      if(filterdObj['EmpType'].length > 0 && filterdObj['PackageTextValue'] != undefined){
        let Api1 = `https://apis.ccbp.in/jobs?employment_type=${emp_typeValue}&minimum_package= ${ctcValue}`
          let otpions = {
            headers:{
              Authorization: `Bearer ${this.cookieMethod.get('jwt_Token')}`,
            },
            method:'GET'
          }
          return  this.httpClient.get(Api1,otpions)
      }
      else if(filterdObj['EmpType'].length > 0){
        let Api3 =  `https://apis.ccbp.in/jobs?employment_type=${emp_typeValue}`
        let otpions = {
          headers:{
            Authorization: `Bearer ${this.cookieMethod.get('jwt_Token')}`,
          },
          method:'GET'
        }
        return  this.httpClient.get(Api3,otpions)
      }
      else{
        let Api4 =  `https://apis.ccbp.in/jobs?minimum_package=${ctcValue}`
        let otpions = {
          headers:{
            Authorization: `Bearer ${this.cookieMethod.get('jwt_Token')}`,
          },
          method:'GET'
        }
        return  this.httpClient.get(Api4,otpions)
      }
    }
    else{
      if(filterdObj['EmpType'].length > 0 && filterdObj['PackageTextValue'] != undefined && userValue.length > 0){
        console.log("Hello Freelance",emp_typeValue)
        console.log("Hello Freelance",ctcValue)
        let Api2 = `https://apis.ccbp.in/jobs?employment_type=${emp_typeValue}&minimum_package=${ctcValue}&search=${userValue}`
          let otpions = {
            headers:{
              Authorization: `Bearer ${this.cookieMethod.get('jwt_Token')}`,
            },
            method:'GET'
          }
          return  this.httpClient.get(Api2,otpions)
      }
      else if(filterdObj['EmpType'].length > 0 && userValue.length > 0){
        let Api6 =  `https://apis.ccbp.in/jobs?employment_type=${emp_typeValue}&search=${userValue}`
        let otpions = {
          headers:{
            Authorization: `Bearer ${this.cookieMethod.get('jwt_Token')}`,
          },
          method:'GET'
        }
        return  this.httpClient.get(Api6,otpions)
      }
      else{
        let Api5 =  `https://apis.ccbp.in/jobs?minimum_package=${ctcValue}&search=${userValue}`
        let otpions = {
          headers:{
            Authorization: `Bearer ${this.cookieMethod.get('jwt_Token')}`,
          },
          method:'GET'
        }
        return  this.httpClient.get(Api5,otpions)
      }
    }
  }
}
