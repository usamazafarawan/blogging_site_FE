import { Injectable } from '@angular/core';
import {  EMPTY, Observable, catchError, tap } from 'rxjs';
import { MainRequestServiceService } from './main-request-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../Environments/Environmet';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
     baseUrl = environment.apiUrl; 

  constructor(private mainRequestService: MainRequestServiceService,
    private toastr: ToastrService,
  ) { }

  authLogin(data:any): Observable<any> {
    return this.mainRequestService.addData(`${this.baseUrl}/auth/login`, data);   
  }


    getCategories(): Observable<any[]> {
   return this.mainRequestService.getData(`${this.baseUrl}/categories/get`).pipe(catchError(err => {
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
    return this.mainRequestService.addData(`${this.baseUrl}/blogs/create`, data);
  }

     getBlogs(): Observable<any[]> {
   return this.mainRequestService.getData(`${this.baseUrl}/blogs/get`); 
  }


  getBlogByCategoryId(id: string): Observable<any[]> {
    return this.mainRequestService.getData(`${this.baseUrl}/blogs/category/${id}`).pipe(catchError(err => {
      console.log("error", err)
      const message = err.error?.message || 'An error has occured.';
      this.toastr.error(message);
      return EMPTY;
    }));
  }

    getBlogDetailById(id: string,isEdit:boolean = false): Observable<any[]> {
    return this.mainRequestService.getData(`${this.baseUrl}/blogs/blog/${id}?isEdit=${isEdit}`).pipe(catchError(err => {
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

    updateBlog(id: string,data:any): Observable<any[]> {
    return this.mainRequestService.updateData(`${this.baseUrl}/blogs/update/${id}`,data);
  }

  getBlogByQuery(query: string): Observable<any[]> {
    return this.mainRequestService.getData(`${this.baseUrl}/blogs/searchQuery?query=${encodeURIComponent(query)}`);
  }


} 
