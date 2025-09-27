import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent,
    HttpHeaders
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    token: string = '';
    currentUser:any={ };
    assetBaseUrl: string = `assets/`;


    constructor(private router: Router ) { 
        // this.currentUser =  this.localStorageService.get('user')
        // this.token = this.currentUser.token;
     }
    intercept(request: HttpRequest<any>, next: HttpHandler): any {
        // add custom header
        const customReq = request.clone({
            // headers: request.headers.set('app-author', 'Dzhavat')
            headers: request.headers.set('Content-Type', 'application/json')

        });

        console.log('processing request', customReq);

        return next.handle(customReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate(['']);
                }
                return throwError(error);
            })
        );
    }
}