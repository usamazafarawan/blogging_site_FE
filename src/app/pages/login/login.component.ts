import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../core/services/request.service';
import { MainRequestServiceService } from '../../core/services/main-request-service.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule , RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MainRequestServiceService, RequestService]
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;


  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService,private authService:AuthService) {
  }

  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


   onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Data:', this.loginForm.value);


   const data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };


          this.authService.authLogin(data).subscribe({
        next: (res: any) => {
          console.log('res: ', res);
          if (res && res.data.authToken) {
            localStorage.setItem('accessToken', res.data.authToken);
            localStorage.setItem('userEmail', res.data.userEmail);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('id', res.data.userId);
             localStorage.setItem('name', res.data.userName);


            const role = res.data.role || '';
            if (role == 'admin') {
            this.toastr.success('Admin Logged in Successfully');
                this.router.navigate(['/admin/dashboard']);
             } else {
            
            }
          }
        },
        error: (err:any) => {
               this.toastr.error('Error while login',err.error.err);

          console.error("Login Error:", err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


}
