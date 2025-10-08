import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  

  readonly _selectedBlogCategory = new BehaviorSubject<any>(null);
  selectedBlogCategory$ = this._selectedBlogCategory.asObservable();




  
}
