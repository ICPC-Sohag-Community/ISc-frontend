import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { HomeHeroComponent } from '../../Components/Home-Components/home-hero/home-hero.component';
import { AboutUsComponent } from "../../Components/Home-Components/about-us/about-us.component";
import { AchievementsComponent } from "../../Components/Home-Components/achievements/achievements.component";
import { CommonModule } from '@angular/common';
import { FoundersComponent } from "../../Components/Home-Components/founders/founders.component";
import { CoachesComponent } from "../../Components/Home-Components/coaches/coaches.component";
import { FeedbackComponent } from "../../Components/Home-Components/feedback/feedback.component";

declare var $: any;

@Component({
  selector: 'app-home-public',
  standalone: true,
  imports: [
    HomeHeroComponent,
    AboutUsComponent,
    AchievementsComponent,
    CommonModule,
    FoundersComponent,
    CoachesComponent,
    FeedbackComponent
],
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.scss']
})
export class HomePublicComponent  {

}

