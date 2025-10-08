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

@Component({
  selector: 'app-blogs-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.scss',
  providers: [MainRequestServiceService, RequestService]
})
export class BlogsListPageComponent implements OnInit, OnDestroy {
  categoryName = '';
  loading: boolean = false;
  blogs:any[] =[];
  


  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private requestService: RequestService,
    private globalDataService: GlobalDataService, private adminService: AdminService
  ) {
  }

  ngOnInit(): void {
          const id:string =  this.route.snapshot.paramMap.get('id') || '';
      this.fetchBlogsByCategory(id);

    // const selectedCategoryDetail: any = this.globalDataService._selectedBlogCategory.getValue();
    // if (selectedCategoryDetail) {
    //   this.categoryName = selectedCategoryDetail.name || '';
    //   this.fetchBlogsByCategory(selectedCategoryDetail._id);
    // }
  }


  fetchBlogsByCategory(id: string) {
    this.loading = true;
    this.adminService.getBlogByCategoryId(id).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res && res?.data?.length) {
          this.blogs = res.data;
          this.categoryName = this.blogs[0]?.moduleDetail?.name || '';
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.toastr.success('Error while fetching blogs', err);
      }
    });
  }


  goBack() {
    this.router.navigate(['/main-page']);
  }



  ngOnDestroy(): void {
    this.globalDataService._selectedBlogCategory.next(null);
  }


}
