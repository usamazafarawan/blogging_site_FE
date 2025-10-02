import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {

      const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');

    if (token && role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/main-page']);
      return false;
    }
  }
}