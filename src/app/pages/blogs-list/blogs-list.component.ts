import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../core/services/request.service';
import { MainRequestServiceService } from '../../core/services/main-request-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-blogs-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule,RouterModule,HeaderComponent,FooterComponent],
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.scss',
  providers: [MainRequestServiceService, RequestService]
})
export class BlogsListPageComponent {
  categoryName = 'Technology'; // You can set this dynamically from route params


  blogs = Array.from({ length: 30 }).map((_, i) => ({
    name: `Awesome Blog Post #${i + 1}`,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non mauris vitae neque tempus suscipit.',
    author: i % 2 === 0 ? 'Jane Doe' : 'John Smith',
    tags: ['Cloud', 'Tech', 'RAP'].slice(0, Math.floor(Math.random() * 3) + 1),
    thumbnail: `https://picsum.photos/seed/blog${i}/400/250`,
    date: new Date(),
  }));
 

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private requestService: RequestService) {
  }


  goBack() {
    this.router.navigate(['/main-page']);
  }
 
}
