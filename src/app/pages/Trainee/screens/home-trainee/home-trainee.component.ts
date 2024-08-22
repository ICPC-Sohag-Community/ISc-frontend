import { Component, signal } from '@angular/core';
import { TraineeCardsComponent } from "../../Components/trainee-cards/trainee-cards.component";
import { TraineeHomeMentorComponent } from "../../Components/trainee-home-mentor/trainee-home-mentor.component";
import { HeadsCarouselComponent } from '../../Components/heads-carousel/heads-carousel.component';
import { CommonModule } from '@angular/common';
import { HomeTraineeTasksComponent } from '../../Components/home-trainee-tasks/home-trainee-tasks.component';
import { TraineeChartComponent } from "../../Components/trainee-chart/trainee-chart.component";


@Component({
  selector: 'app-home-trainee',
  standalone: true,
  imports: [TraineeCardsComponent, TraineeHomeMentorComponent, HeadsCarouselComponent, HomeTraineeTasksComponent,TraineeChartComponent, TraineeChartComponent,CommonModule],
  templateUrl: './home-trainee.component.html',
  styleUrl: './home-trainee.component.scss'
})
export class HomeTraineeComponent {
  isLoading = signal<boolean>(false);
  ngAfterViewInit(): void {
    this.isLoading.set(false)
    // You can now safely access the DOM elements here.
  }

}
