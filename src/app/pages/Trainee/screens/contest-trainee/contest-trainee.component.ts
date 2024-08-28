import { Component } from '@angular/core';
import { ContestHeaderComponent } from '../../Components/Contests-Components/Contests-header/contest-header.component';
import { NextContestComponent } from '../../Components/Contests-Components/Next-contest/next-contest.component';
import { ContestCarouselComponent } from '../../Components/Contests-Components/Contest-Carousel/contest-carousel.component';
import { EndedCarouselComponent } from '../../Components/Contests-Components/ended-carousel/ended-carousel.component';

@Component({
  selector: 'app-contest-trainee',
  standalone: true,
  imports: [ContestHeaderComponent,NextContestComponent,ContestCarouselComponent,EndedCarouselComponent],
  templateUrl: './contest-trainee.component.html',
  styleUrl: './contest-trainee.component.scss'
})
export class ContestTraineeComponent {
  isLoading = true; // Initially show the loader

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 700);
  }
}
