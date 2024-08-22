import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import SwiperCore, { SwiperOptions } from 'swiper';

// import SwiperCore from 'swiper';
import Swiper, { Navigation } from 'swiper';
import { SwiperModule } from 'swiper/angular';


Swiper.use([Navigation]);

@Component({
  selector: 'app-heads-carousel',
  standalone: true,
  imports: [CommonModule,SwiperModule],
  templateUrl: './heads-carousel.component.html',
  styleUrl: './heads-carousel.component.scss',
})
export class HeadsCarouselComponent {
  @ViewChild('swiperRef', { static: false }) swiperRef!: HeadsCarouselComponent;

  mentors = [
    {
      name: 'Name Mentor',
      college: 'Information Technology',
      handle: 'Name_Mentor148',
      email: 'namementor148@gmail.com',
      image: 'assets/mentor1.jpg'
    },
    {
      name: 'Another Mentor',
      college: 'Computer Science',
      handle: 'Another_Mentor149',
      email: 'anothermentor149@gmail.com',
      image: 'assets/mentor2.jpg'
    },
    {
      name: 'Another Mentor',
      college: 'Computer Science',
      handle: 'Another_Mentor149',
      email: 'anothermentor149@gmail.com',
      image: 'assets/mentor2.jpg'
    },
    {
      name: 'Another Mentor',
      college: 'Computer Science',
      handle: 'Another_Mentor149',
      email: 'anothermentor149@gmail.com',
      image: 'assets/mentor2.jpg'
    },
    {
      name: 'Another Mentor',
      college: 'Computer Science',
      handle: 'Another_Mentor149',
      email: 'anothermentor149@gmail.com',
      image: 'assets/mentor2.jpg'
    },
    // Add more mentor objects
  ];

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: false,
    pagination: { clickable: false },
    scrollbar:false,
    autoplay:false,
    
  };
  private swiper?: SwiperCore;

  onSwiper(swiper: SwiperCore) {
    this.swiper = swiper;
  }

  nextSlide() {
    if (this.swiper) {
      console.log(this.swiper);

      this.swiper.slideNext();
    }
  }

  prevSlide() {
    if (this.swiper) {
      this.swiper.slidePrev();
    }
  }

}
