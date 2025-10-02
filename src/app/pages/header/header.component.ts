import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../core/services/request.service';
import { MainRequestServiceService } from '../../core/services/main-request-service.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [MainRequestServiceService, RequestService]
})
export class HeaderComponent implements OnInit  {

  isMenuOpen = false;
  openSubmenu: string | null = null;
  isUserMenuOpen = false;
  categories: any[] = [];

  constructor(private router: Router, private adminService:AdminService,
     private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private requestService: RequestService) {
  }


  ngOnInit(): void {
    this.getAllCategories();

  }

  toggleSubmenu(menu: string) {
    this.openSubmenu = this.openSubmenu === menu ? null : menu;
  }


  main_page(){
    this.router.navigate(["/main-page"]);
  }

  login() {
    this.isUserMenuOpen  = false
    this.router.navigate(["/login"]);
  }

  register() {
        this.isUserMenuOpen  = false
    this.router.navigate(["/register"]);
  }


    getAllCategories() {

    this.adminService.getCategories().subscribe({
      next: (res: any) => {
        console.log('res: ', res);
        if (res && res?.length) {
          this.categories = res;
        }
      },
      error: (err: any) => {
        this.toastr.success('Error while fetching categories', err);
      }
    }
    )
  }


}
