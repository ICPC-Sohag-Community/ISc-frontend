import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { SwiperOptions } from 'swiper';
import Swiper, { Navigation } from 'swiper';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule,SwiperModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

  stars:number[]=[1,2,3,4,5]

  // Reference to Swiper instance
  private swiper?: SwiperCore;

    // Swiper configuration options
    config1: SwiperOptions = {
      slidesPerView: 3, // Number of slides visible at a time
      spaceBetween: 110, // Space between slides
      navigation: false, // Disable built-in navigation
      pagination: { clickable: false }, // Disable clickable pagination
      scrollbar: false, // Disable scrollbar
      autoplay: false, // Disable autoplay
    };

    // Method to handle Swiper instance when it's ready
    onSwiper(swiper: SwiperCore) {
      this.swiper = swiper;
    }

    // Method to move to the next slide
    nextSlide() {
      if (this.swiper) {
        this.swiper.slideNext();
      }
    }

    // Method to move to the previous slide
    prevSlide() {
      if (this.swiper) {
        this.swiper.slidePrev();
      }
    }
}
