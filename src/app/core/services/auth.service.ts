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
  ) { }

  authLogin(data:any): Observable<any> {
    return this.mainRequestService.addData(`${this.baseUrl}/auth/login`, data);
  }


} 
