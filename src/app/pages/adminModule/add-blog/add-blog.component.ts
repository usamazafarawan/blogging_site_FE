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

  pdfFile: File | null = null;
  thumbnailFile: File | null = null;
  thumbnailPreview: string | ArrayBuffer | null = null;
  fileError = { pdf: false, thumbnail: false };
  loading = false;

  constructor(private fb: FormBuilder,private adminService: AdminService, private router: Router, private route: ActivatedRoute,private toastr: ToastrService, private authService: AuthService) {
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

// onSubmit() {
//   // 🔹 Validate form and files
//   if (this.blogForm.invalid || !this.pdfFile || !this.thumbnailFile) {
//     this.blogForm.markAllAsTouched();
//     this.fileError.pdf = !this.pdfFile;
//     this.fileError.thumbnail = !this.thumbnailFile;
//     this.toastr.warning('Please fill all required fields and upload both files.');
//     return;
//   }

//   this.loading = true;

//   // 🔹 Prepare form data for upload
//   const formData = new FormData();
//   formData.append('name', this.blogForm.value.name);
//   formData.append('description', this.blogForm.value.description);
//   formData.append('author', this.blogForm.value.author);
//   formData.append('moduleId', this.blogForm.value.moduleId);
//   formData.append('tags', JSON.stringify(this.tagsArray)); // ensure array is sent as string
//   formData.append('pdfFile', this.pdfFile);
//   formData.append('thumbnail', this.thumbnailFile);

//   // 🔹 Call the API via service
//   this.adminService.saveBlog(formData).subscribe({
//     next: (res) => {
//       this.router.navigate(['/admin/admin-blogs-list']);
//       this.blogForm.reset();
//       this.pdfFile = null;
//       this.thumbnailFile = null;
//       this.loading = false;
//     },
//     error: (err) => {
//       console.error('Error saving blog:', err);
//       const message = err?.error?.message || 'Error saving blog. Please try again.';
//       this.toastr.error(message);
//       this.loading = false;
//     },
//   });
// }


onSubmit() {
  if (this.blogForm.invalid || !this.pdfFile || !this.thumbnailFile) {
    this.blogForm.markAllAsTouched();
    this.fileError.pdf = !this.pdfFile;
    this.fileError.thumbnail = !this.thumbnailFile;
    this.toastr.warning('Please fill all required fields and upload both files.');
    return;
  }

  this.loading = true;

  // Convert both files to Base64 before sending
  Promise.all([
    this.convertToBase64(this.pdfFile),
    this.convertToBase64(this.thumbnailFile)
  ]).then(([pdfBase64, thumbnailBase64]) => {
    const payload = {
      name: this.blogForm.value.name,
      description: this.blogForm.value.description,
      author: this.blogForm.value.author,
      moduleId: this.blogForm.value.moduleId,
      tags: this.tagsArray,
      pdfFile: pdfBase64,        // base64 string of PDF
      thumbnail: thumbnailBase64, // base64 string of thumbnail
      moduleDetail:{
        id:this.blogForm.value.moduleId,
        name:this.moduleList.find(m=>m.id===this.blogForm.value.moduleId)?.name || ''
      }
    };
      console.log('payload: ', payload);

    this.adminService.saveBlog(payload).subscribe({
      next: (res) => {
        this.router.navigate(['/admin/admin-blogs-list']);
        this.blogForm.reset();
        this.pdfFile = null;
        this.thumbnailFile = null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error saving blog:', err);
        const message = err?.error?.message || 'Error saving blog. Please try again.';
        this.toastr.error(message);
        this.loading = false;
      },
    });
  }).catch((err) => {
    console.error('Error converting files:', err);
    this.toastr.error('Error processing files.');
    this.loading = false;
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
