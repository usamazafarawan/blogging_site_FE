import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Category } from '../../../models/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { AdminService } from '../../../core/services/admin.service';


@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule,],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {


  categories: Category[] = [

  ];

  newCategory = '';
  newSubCategory = '';
  selectedCategoryIndex: number | null = null;


  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private authService: AuthService,
    private adminService: AdminService,

  ) {
  }


  ngOnInit(): void {
    this.getAllCategories();
  }


  // Add Category
  addCategory() {
    if (this.newCategory.trim()) {
      this.categories.push({ name: this.newCategory, subCategories: [] });
      this.newCategory = '';
    }
  }

  deleteCategory(i: number) {
    this.categories.splice(i, 1);
  }

  // Add SubCategory to selected category
  addSubCategory() {
    if (this.selectedCategoryIndex !== null && this.newSubCategory.trim()) {
      this.categories[this.selectedCategoryIndex].subCategories.push({
        name: this.newSubCategory
      });
      this.newSubCategory = '';
    }
  }

  deleteSubCategory(catIndex: number, subIndex: number) {
    this.categories[catIndex].subCategories.splice(subIndex, 1);
  }

  // Set which category we’re adding subcategories into
  selectCategory(index: number) {
    this.selectedCategoryIndex = index;
  }



  save() {
    this.categories
    console.log('this.categories: ', this.categories);

    const data = {
      categories: this.categories
    };

    this.adminService.saveCategories(data).subscribe({
      next: () => this.toastr.success('Categories saved successfully'),
      error: (err) => this.toastr.error('Error saving categories', err)
    });
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
