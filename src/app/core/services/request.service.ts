import { Injectable } from '@angular/core';
import {  EMPTY, Observable, catchError } from 'rxjs';
import { MainRequestServiceService } from './main-request-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private mainRequestService: MainRequestServiceService,
    private toastr: ToastrService,
  ) { }

  getContactsList(): Observable<any> {
    const mockUrl = 'https://688a8c212a52cabb9f4e7a83.mockapi.io/api/v1/contacts';
    return this.mainRequestService.getData(`${mockUrl}`).pipe(catchError(err => {
      console.log("error", err)
      const message = err.error?.message || 'An error has occured.';
      this.toastr.error(message);
      return EMPTY;
    }));
  }

  getContactsDetailById(Id: number): Observable<any> {
    const mockUrl = `https://688a8c212a52cabb9f4e7a83.mockapi.io/api/v1/contacts/${Id}`;
    return this.mainRequestService.getData(`${mockUrl}`).pipe(catchError(err => {
      console.log("error", err)
      const message = err.error?.message || 'An error has occured.';
      this.toastr.error(message);
      return EMPTY;
    }));
  }

} 
