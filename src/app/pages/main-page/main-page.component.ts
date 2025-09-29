import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../core/services/request.service';
import { MainRequestServiceService } from '../../core/services/main-request-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  providers: [MainRequestServiceService, RequestService]
})
export class MainPageComponent {

  constructor(){
  this.updateItemsPerView();
  }


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


    slides_images = [
    { img: 'assets/images/image_1.png', title: 'Mountain View', description: 'A calm mountain view at sunrise.' },
    { img: 'assets/images/image_2.png', title: 'Ocean Breeze', description: 'Relaxing waves on the beach.' },
    { img: 'assets/images/image_3.png', title: 'Forest Path', description: 'A peaceful walk through nature.' },
    { img: 'assets/images/image_4.png', title: 'Desert Dunes', description: 'Golden sands under the blue sky.' },
    { img: 'assets/images/image_5.png', title: 'City Lights', description: 'The city skyline glowing at night.' },
    { img: 'assets/images/image_6.png', title: 'Snow Peaks', description: 'Snowy mountains touching the clouds.' },
    { img: 'assets/images/image_7.png', title: 'Sunny Field', description: 'A field full of bright sunshine.' },
  ];


  
   featuredItems = [
  { 
    img: 'assets/images/image_8.png', 
    title: 'Explore the Majestic Mountains', 
    description: 'Discover breathtaking views and the tranquility of sunrise over the mountain peaks, perfect for adventure seekers and nature lovers alike.' 
  },
  { 
    img: 'assets/images/image_9.png', 
    title: 'Feel the Ocean Breeze', 
    description: 'Relax by the shore with calming waves and fresh sea air — a refreshing escape to unwind and recharge your mind.' 
  },
  { 
    img: 'assets/images/image_10.png', 
    title: 'Walk the Serene Forest Path', 
    description: 'Immerse yourself in the soothing sounds of birds and rustling leaves as you stroll through lush, green trails in nature.' 
  },
  { 
    img: 'assets/images/image_11.png', 
    title: 'Adventure in the Desert Dunes', 
    description: 'Experience the golden sands and endless horizons of the desert, where beauty meets the thrill of exploration.' 
  }
];




  currentIndex = 0;
  intervalId: any;
  autoSlideTime = 3000; // 3 seconds



  currentIndexImage = 0;
  itemsPerView = 3;

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

   @HostListener('window:resize')
   updateItemsPerView() {
    this.itemsPerView = window.innerWidth < 768 ? 1 : 3;
  }

  nextSlide() {
    if (this.currentIndexImage < this.slides_images.length - this.itemsPerView) {
      this.currentIndexImage++;
    } else {
      this.currentIndexImage = 0; // loop
    }
  }

  prevSlide() {
    if (this.currentIndexImage > 0) {
      this.currentIndexImage--;
    } else {
      this.currentIndexImage = this.slides_images.length - this.itemsPerView; // loop
    }
  }
}
