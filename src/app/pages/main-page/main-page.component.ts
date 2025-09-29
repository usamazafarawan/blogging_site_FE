import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../core/services/request.service';
import { MainRequestServiceService } from '../../core/services/main-request-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, ContactDetailComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  providers: [MainRequestServiceService, RequestService]
})
export class MainPageComponent {

 slides = [
    {
      img: 'assets/images/c-2.png',
      title: 'Innovative Solutions',
      description: 'We deliver modern web apps with Angular & Tailwind.',
    },
    {
      img: 'assets/images/c-3.png',
      title: 'Seamless UI',
      description: 'Beautiful, responsive, and accessible design.',
    },
    {
      img: 'assets/images/c-4.png',
      title: 'Scalable Apps',
      description: 'Our apps grow with your business needs.',
    },
      {
      img: 'assets/images/c-1.jpg',
      title: 'Scalable Apps',
      description: 'Our apps grow with your business needs.',
    },
  ];

 currentIndex = 0;
  intervalId: any;
  autoSlideTime = 2000; // 5 seconds

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.clearAutoSlide();
  }

  // Auto slide logic
  startAutoSlide() {
    this.clearAutoSlide();
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, this.autoSlideTime);
  }

  clearAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Manual dot click
  goToSlide(index: number) {
    this.currentIndex = index;
    this.startAutoSlide(); // reset timer after manual click
  }

   searchText: string = '';

  clearSearch() {
    this.searchText = '';
  }
}
