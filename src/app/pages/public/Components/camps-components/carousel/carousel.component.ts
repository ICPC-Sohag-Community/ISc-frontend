import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import SwiperCore, { SwiperOptions } from 'swiper';
import Swiper, { Navigation } from 'swiper';

import { SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [SwiperModule,CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  // @ViewChild('swiperRef', { static: false }) swiperRef!: CarouselComponent; // ViewChild to reference Swiper component


  // // Reference to Swiper instance
  // private swiper?: SwiperCore;


  // // Lifecycle hook to initialize component
  // // ngOnInit(): void {
  // //   this.loadContestData(); // Load contest data when component initializes
  // // }

  // // Method to load contest data using the ContestService
  // // private loadContestData(): void {
  // //   this.contestService.inComingContest.subscribe({
  // //     next: (response) => {
  // //       this.inComingContests = response; // Update the incoming contests array with the response
  // //     },
  // //   });
  // // }

  // Swiper configuration options
  config1: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 40,
    pagination: {
      el: '.swiper-pagination', // Automatically adds this element
      clickable: true, // Makes dots clickable
    },
    scrollbar: false,
    autoplay: false,
  };


  // // Method to handle Swiper instance when it's ready
  // onSwiper(swiper: SwiperCore) {
  //   this.swiper = swiper;
  // }

  // // Method to move to the next slide
  // nextSlide() {
  //   if (this.swiper) {
  //     this.swiper.slideNext();
  //   }
  // }

  // // Method to move to the previous slide
  // prevSlide() {
  //   if (this.swiper) {
  //     this.swiper.slidePrev();
  //   }
  // }
}
