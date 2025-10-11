import { Injectable } from '@angular/core';
import {  EMPTY, Observable, catchError, tap } from 'rxjs';
import { MainRequestServiceService } from './main-request-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../Environments/Environmet';
import { Category } from '../../models/interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
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


    getCategories(): Observable<any[]> {
   return this.mainRequestService.getData(`${this.baseUrl}/categories/get`).pipe(catchError(err => {
      console.log("error", err)
      const message = err.error?.message || 'An error has occured.';
      this.toastr.error(message);
      return EMPTY;
    }));  }

  saveCategories(data: any): Observable<any> {
  return this.mainRequestService.addData(`${this.baseUrl}/categories/create`, data).pipe(catchError(err => {
      console.log("error", err)
      const message = err.error?.message || 'An error has occured.';
      this.toastr.error(message);
      return EMPTY;
    }));
  }


    /** ✅ Save a new blog post */
  saveBlog(data: any): Observable<any> {
    console.log('data: ', data);
    return this.mainRequestService.addData(`${this.baseUrl}/blogs/create`, data).pipe(
      tap(() => this.toastr.success('Blog created successfully!')),
      catchError(err => {
        console.error('Blog save error:', err);
        const message = err.error?.message || 'An error occurred while saving the blog.';
        this.toastr.error(message);
        return EMPTY;
      })
    );
  }

     getBlogs(): Observable<any[]> {
   return this.mainRequestService.getData(`${this.baseUrl}/blogs/get`).pipe(catchError(err => {
      console.log("error", err)
      const message = err.error?.message || 'An error has occured.';
      this.toastr.error(message);
      return EMPTY;
    }));  
  }


  getBlogByCategoryId(id: string): Observable<any[]> {
    return this.mainRequestService.getData(`${this.baseUrl}/blogs/category/${id}`).pipe(catchError(err => {
      console.log("error", err)
      const message = err.error?.message || 'An error has occured.';
      this.toastr.error(message);
      return EMPTY;
    }));
  }

    getBlogDetailById(id: string): Observable<any[]> {
    return this.mainRequestService.getData(`${this.baseUrl}/blogs/blog/${id}`).pipe(catchError(err => {
      console.log("error", err)
      const message = err.error?.message || 'An error has occured.';
      this.toastr.error(message);
      return EMPTY;
    }));
  }

     deleteBlog(id: string): Observable<any[]> {
    return this.mainRequestService.deleteData(`${this.baseUrl}/blogs/delete/${id}`).pipe(catchError(err => {
      console.log("error", err)
      const message = err.error?.message || 'An error has occured.';
      this.toastr.error(message);
      return EMPTY;
    }));
  }


} 
