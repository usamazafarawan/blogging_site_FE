import { Injectable } from '@angular/core';
import {  EMPTY, Observable, catchError } from 'rxjs';
import { MainRequestServiceService } from './main-request-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../Environments/Environmet';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
     baseUrl = environment.apiUrl; 

  constructor(private mainRequestService: MainRequestServiceService,
    private toastr: ToastrService,
  ) { }

  authLogin(data:any): Observable<any> {
    return this.mainRequestService.addData(`${this.baseUrl}/auth/login`, data).pipe(catchError(err => {
      console.log("error", err)
      const message = err.error?.message || 'An error has occured.';
      this.toastr.error(message);
      return EMPTY;
    }));
  }


} 
