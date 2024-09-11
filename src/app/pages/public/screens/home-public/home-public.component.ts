import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { HomeHeroComponent } from '../../Components/Home-Components/home-hero/home-hero.component';

declare var $: any;

@Component({
  selector: 'app-home-public',
  standalone: true,
  imports: [
    HomeHeroComponent
  ],
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.scss']
})
export class HomePublicComponent  {


}

