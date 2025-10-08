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
  
  // Array.from({ length: 30 }).map((_, i) => ({
  //   name: `Awesome Blog Post #${i + 1}`,
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non mauris vitae neque tempus suscipit.',
  //   author: i % 2 === 0 ? 'Jane Doe' : 'John Smith',
  //   tags: ['Cloud', 'Tech', 'RAP'].slice(0, Math.floor(Math.random() * 3) + 1),
  //   thumbnail: `https://picsum.photos/seed/blog${i}/400/250`,
  //   date: new Date(),
  // }));


  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private requestService: RequestService,
    private globalDataService: GlobalDataService, private adminService: AdminService
  ) {
  }

  ngOnInit(): void {

    const selectedCategoryDetail: any = this.globalDataService._selectedBlogCategory.getValue();
    console.log('selectedCategoryDetail: ', selectedCategoryDetail);
    if (selectedCategoryDetail) {
      this.categoryName = selectedCategoryDetail.name || '';
      this.fetchBlogsByCategory(selectedCategoryDetail._id);

    }

  }


  fetchBlogsByCategory(id: string) {
    this.loading = true;
    this.adminService.getBlogByCategoryId(id).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log('res: ', res);
        if (res && res?.data?.length) {
          this.blogs = res.data;
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.toastr.success('Error while fetching blogs', err);
      }
    }
    )

  }


  goBack() {
    this.router.navigate(['/main-page']);
  }



  ngOnDestroy(): void {
    this.globalDataService._selectedBlogCategory.next(null);
  }


}
