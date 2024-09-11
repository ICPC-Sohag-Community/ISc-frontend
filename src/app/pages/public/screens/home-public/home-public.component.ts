import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { HomeHeroComponent } from '../../Components/Home-Components/home-hero/home-hero.component';
import { AboutUsComponent } from "../../Components/Home-Components/about-us/about-us.component";

declare var $: any;

@Component({
  selector: 'app-home-public',
  standalone: true,
  imports: [
    HomeHeroComponent,
    AboutUsComponent
],
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.scss']
})
export class HomePublicComponent  {


}

