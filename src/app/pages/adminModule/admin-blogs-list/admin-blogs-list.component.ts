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
loading: boolean = false;


  constructor(private fb: FormBuilder,private adminService: AdminService, private router: Router, private route: ActivatedRoute,private toastr: ToastrService, private authService: AuthService) {
  
  }

   ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
      this.loading = true;
    this.adminService.getBlogs().subscribe({
      next: (res:any) => {
        this.blogs = res.data || [];
            this.loading = false;
      },
      error: () => {
        this.toastr.error('Failed to fetch blogs');
            this.loading = false;
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

openPDF(base64Data: string) {
  try {
    // 1️⃣ Remove prefix if present
    const base64 = base64Data.replace(/^data:application\/pdf;base64,/, '');

    // 2️⃣ Decode Base64 → binary
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    // 3️⃣ Convert binary → Blob
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // 4️⃣ Create temporary blob URL and open it
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  } catch (error) {
    console.error('Error opening PDF:', error);
    alert('Could not open PDF file.');
  }
}

}
