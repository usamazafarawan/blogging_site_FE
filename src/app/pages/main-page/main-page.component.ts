import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../core/services/request.service';
import { MainRequestServiceService } from '../../core/services/main-request-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { GlobalDataService } from '../../core/services/data.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule ,HeaderComponent,FooterComponent ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  providers: [MainRequestServiceService, RequestService]
})
export class MainPageComponent implements OnDestroy {

  constructor(private router: Router, private globalDataService: GlobalDataService,){
  this.updateItemsPerView();
  }


 slides = [
    {
      img: 'assets/images/b-1.png',
      title: 'SHARE YOUR EXPERIENCE WITH US',
      description: 'IF YOU WANT TO SHARE ANY BLOG WITH US WITH YOUR OWN NAME AND IDEA',
    },
    {
      img: 'assets/images/b-2.png',
      title: 'Dive Into The LEARNING ZONE ',
      description: 'START YOUR LEARNING TODAY, ANY COURSE JUST ON ONE CLICK',
    },
    {
      img: 'assets/images/b-3.png',
      title: 'LEAD THE SAP WITH YOUR EXPERTISE ',
      description: 'SHARE YOUR RSUME AND LET US FIND THE JOB FOR YOU',
    },
      {
      img: 'assets/images/b-4.png',
      title: 'LEARN SAP WITH OUR BEST TUTORS',
      description: 'IF YOU WANT TO LEARN ANY SAP MODULE WITH OUR ONE TO ONE TUTOR ONLINE',
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

searchByText() {
  if (this.searchText.trim()) {
    this.globalDataService._searchQueryText.next(this.searchText);
    this.router.navigate(['/blogs-list']);
  }
}


  ngDestroy(): void {

  }
}
