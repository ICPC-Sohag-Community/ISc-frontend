import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { HomeHeroComponent } from '../../Components/Home-Components/home-hero/home-hero.component';
import { AboutUsComponent } from "../../Components/Home-Components/about-us/about-us.component";
import { AchievementsComponent } from "../../Components/Home-Components/achievements/achievements.component";
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { SwiperOptions } from 'swiper';
import Swiper, { Navigation } from 'swiper';

declare var $: any;

@Component({
  selector: 'app-home-public',
  standalone: true,
  imports: [
    HomeHeroComponent,
    AboutUsComponent,
    AchievementsComponent,
    CommonModule,
    SwiperModule
],
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.scss']
})
export class HomePublicComponent  {

  achievements:any[]=[
    {
      id:1,
      img:"../../../../../assets/img_public/achivements_1.png",
      text:"4th on Egypt (ECPC 2024)"
    },
    {
      id:2,
      img:"../../../../../assets/img_public/achivements_2.png",
      text:"10th on Egypt (ECPC 2023)"
    },
    {
      id:3,
      img:"../../../../../assets/img_public/achivements_3.png",
      text:"Helped 147 students to participate in ECPC Qualifications (2022)"
    }
  ]
  founders:any[]=[
    {
      id:1,
      img:"../../../../../assets/img_public/zyad.png",
      name:"Zyad Bahaa"
    },
    {
      id:2,
      img:"../../../../../assets/img_public/Ahmed.png",
      name:"Ahmed Alaa"
    },
    {
      id:3,
      img:"../../../../../assets/img_public/karim.png",
      name:"Karim Abdelrhman"
    }
  ]
  stars:number[]=[1,2,3,4,5]

  // Reference to Swiper instance
  private swiper?: SwiperCore;

    // Swiper configuration options
    config1: SwiperOptions = {
      slidesPerView: 3, // Number of slides visible at a time
      spaceBetween: 80, // Space between slides
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

