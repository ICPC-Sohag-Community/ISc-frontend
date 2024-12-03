import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import SwiperCore, { Pagination, SwiperOptions } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { ResponsiveService } from '../../../Services/responsive.service';
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [SwiperModule,CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

  public _responsive = inject (ResponsiveService)


  ngOnInit(): void {
    this._responsive.start()
  }
  ngOnDestroy(): void {
    this._responsive.destroy()
  }




  // Swiper configuration options
  config1: SwiperOptions = {
    slidesPerView: 1, // Number of slides visible at a time
    navigation: false, // Disable built-in navigation
    pagination: { clickable: true }, // Disable clickable pagination
    scrollbar: false, // Disable scrollbar
    autoplay: false, // Disable autoplay
  };

}
