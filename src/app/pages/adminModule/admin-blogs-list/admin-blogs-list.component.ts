import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../models/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { AdminService } from '../../../core/services/admin.service';


@Component({
  selector: 'app-blog-list-admin',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './admin-blogs-list.component.html',
  styleUrl: './admin-blogs-list.component.scss'
})
export class AdminBlogListComponent implements OnInit {
blogs:any[] = [];
categoryTitle:string = 'All Blogs List';

  constructor(private fb: FormBuilder,private adminService: AdminService, private router: Router, private route: ActivatedRoute,private toastr: ToastrService, private authService: AuthService) {
  
  }

   ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    this.adminService.getBlogs().subscribe({
      next: (res:any) => {
        this.blogs = res.data || [];
      },
      error: () => {
        this.toastr.error('Failed to fetch blogs');
      },
    });
  }



  editBlog(blog: any) {
    // this.router.navigate(['/edit-blog', blog._id]);
  }

  deleteBlog(blog: any) {
    // if (confirm('Are you sure you want to delete this blog?')) {
    //   this.adminService.deleteBlog(blog._id).subscribe({
    //     next: () => {
    //       this.toastr.success('Blog deleted successfully');
    //       this.loadBlogs();
    //     },
    //     error: () => {
    //       this.toastr.error('Failed to delete blog');
    //     },
    //   });
    // }
  }

   openPDF(pdfPath: string) {
    console.log('pdfPath: ', pdfPath);
    window.open( pdfPath, '_blank');
  }

}
