import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../core/services/request.service';
import { MainRequestServiceService } from '../../core/services/main-request-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { GlobalDataService } from '../../core/services/data.service';
import { AdminService } from '../../core/services/admin.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './blog-detail-page.component.html',
  styleUrl: './blog-detail-page.component.scss',
  providers: [MainRequestServiceService, RequestService]
})
export class BlogDetailPageComponent implements OnInit, OnDestroy {
  blogDetail: any = null;
  loading: boolean = false;
  blogName: string = '';
  sanitizedPdfUrl: SafeResourceUrl | null = null;



  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private requestService: RequestService,
    private globalDataService: GlobalDataService, private adminService: AdminService,
    private sanitizer: DomSanitizer

  ) {
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id') || '';
    this.getBlogDetail(id);
  }


  getBlogDetail(id: string) {
    this.loading = true;
    this.adminService.getBlogDetailById(id).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log('res: ', res);
        if (res && res?.data) {
          this.blogDetail = res.data;
          if (this.blogDetail?.pdfUrl) {
            this.sanitizedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.blogDetail?.pdfUrl);
          }
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.toastr.error('Error while fetching blogs', err);
      }
    });
  }


  goBack() {
    this.router.navigate(['/blogs-list', this.blogDetail.moduleDetail.id]);
  }


  ngOnDestroy(): void {
  }


}
