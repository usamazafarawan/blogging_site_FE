import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../models/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { AdminService } from '../../../core/services/admin.service';


@Component({
  selector: 'app-blog-page',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss'
})
export class AddBlogComponent implements OnInit {
  blogForm: FormGroup;
  moduleList:any[] = [ ];
  isEdit: boolean = false;
  selectedBlogId: string  = '';

  pdfFile: File | null = null;
  thumbnailFile: File | null = null;
  thumbnailPreview: string | ArrayBuffer | null = null;
  fileError = { pdf: false, thumbnail: false };
  loading = false;

  constructor(private fb: FormBuilder,private adminService: AdminService, private router: Router, private route: ActivatedRoute,private toastr: ToastrService, private authService: AuthService,
  ) {
    this.blogForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      moduleId: ['', Validators.required],
      tags: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.selectedBlogId = id;
      this.getBlogDetail();
    }
  }

     getAllCategories() {

    this.adminService.getCategories().subscribe({
      next: (res: any) => {
        console.log("res: ", res);
        if (res && res?.length) {
          console.log("res: ", res);
          res.forEach((category: Category) => {
            if (category.subCategories && category.subCategories.length) {
              category.subCategories.forEach((subCat: any) => {
                this.moduleList.push({ name: subCat.name, id: subCat._id });
              });
            }
          });
        }
      },
      error: (err: any) => {
        this.toastr.success("Error while fetching categories", err);
      },
    });
  }


  getBlogDetail() {
    if (!this.selectedBlogId) return;
    this.adminService.getBlogDetailById(this.selectedBlogId, true).subscribe({
      next: (res: any) => {
        if (res && res.data) {
          const blog = res.data;
          this.blogForm.patchValue({
            author: blog.author,
            name: blog.name,
            description: blog.description,
            moduleId: blog.moduleDetail.id,
            tags: blog.tags.join(', '),
          });
        }
      }
    });
  }

  get tagsArray(): string[] {
    const tagsValue = this.blogForm.get('tags')?.value || '';
    return tagsValue
      .split(',')
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag.length > 0);
  }

  isInvalid(field: string): boolean {
    const control: AbstractControl | null = this.blogForm.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  onFileChange(event: any, type: 'pdf' | 'thumbnail') {
    const file = event.target.files[0];
    if (!file) return;

    if (type === 'pdf') {
      this.pdfFile = file;
      this.fileError.pdf = false;
    } else {
      this.thumbnailFile = file;
      this.fileError.thumbnail = false;

      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailPreview = reader.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    }
  }

  removeFile(type: 'pdf' | 'thumbnail') {
    if (type === 'pdf') {
      this.pdfFile = null;
      this.fileError.pdf = true;
    } else {
      this.thumbnailFile = null;
      this.thumbnailPreview = null;
      this.fileError.thumbnail = true;
    }
  }

onSubmit() {
  // ✅ If form invalid → block submission
  if (this.blogForm.invalid) {
    this.blogForm.markAllAsTouched();
    this.toastr.warning('Please fill all required fields.');
    return;
  }

  // ✅ If creating (not editing), require both files
  if (!this.isEdit && (!this.pdfFile || !this.thumbnailFile)) {
    this.fileError.pdf = !this.pdfFile;
    this.fileError.thumbnail = !this.thumbnailFile;
    this.toastr.warning('Please upload both PDF and thumbnail files.');
    return;
  }

  this.loading = true;

 
  const formData = new FormData();

formData.append('name', this.blogForm.value.name);
formData.append('description', this.blogForm.value.description);
formData.append('author', this.blogForm.value.author);
formData.append('moduleId', this.blogForm.value.moduleId);
formData.append('tags', JSON.stringify(this.tagsArray));

formData.append('moduleDetail', JSON.stringify({
  id: this.blogForm.value.moduleId,
  name: this.moduleList.find(m => m.id === this.blogForm.value.moduleId)?.name || ''
}));

// ✅ Append files only if selected
if (this.pdfFile) formData.append('pdfFile', this.pdfFile);
if (this.thumbnailFile) formData.append('thumbnail', this.thumbnailFile);


// ✅ Choose API based on mode
const request$ = this.isEdit
  ? this.adminService.updateBlog(this.selectedBlogId, formData)
  : this.adminService.saveBlog(formData);

// ✅ Handle response
request$.subscribe({
  next: (res: any) => {
    this.toastr.success(this.isEdit ? 'Blog updated successfully!' : 'Blog created successfully!');
    this.router.navigate(['/admin/admin-blogs-list']);
    this.blogForm.reset();
    this.pdfFile = null;
    this.thumbnailFile = null;
    this.loading = false;
  },
  error: (err: any) => {
    console.error('Error saving blog:', err);
    const message = err?.error?.message || 'Error saving blog. Please try again.';
    this.toastr.error(message);
    this.loading = false;
  },
});
}

// 🔹 Helper function to convert a file to Base64
convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}


}
