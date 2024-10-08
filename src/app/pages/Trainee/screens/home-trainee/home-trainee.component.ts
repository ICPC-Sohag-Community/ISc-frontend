import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TraineeCardsComponent } from "../../Components/Home-Components/trainee-cards/trainee-cards.component";
import { TraineeHomeMentorComponent } from "../../Components/Home-Components/trainee-home-mentor/trainee-home-mentor.component";
import { HeadsCarouselComponent } from '../../Components/Home-Components/heads-carousel/heads-carousel.component';
import { HomeTasksToDoComponent } from '../../Components/Home-Components/home-tasks-todo/home-tasks-todo.component';
import { TraineeChartComponent } from '../../Components/Home-Components/trainee-chart/trainee-chart.component';
import { CommonModule } from '@angular/common';
import { HomeTasksInProgressComponent } from '../../Components/Home-Components/home-tasks-in-progress/home-tasks-in-progress.component';
import { HomeTasksDoneComponent } from '../../Components/Home-Components/home-tasks-done/home-tasks-done.component';

@Component({
  selector: 'app-home-trainee',
  standalone: true,
  imports: [
    TraineeCardsComponent,
    TraineeHomeMentorComponent,
    HeadsCarouselComponent,
    HomeTasksToDoComponent,
    HomeTasksDoneComponent,
    TraineeChartComponent,
    HomeTasksInProgressComponent,
    CommonModule
  ],
  templateUrl: './home-trainee.component.html',
  styleUrls: ['./home-trainee.component.scss']
})
export class HomeTraineeComponent implements OnInit, AfterViewInit {
  isLoading = true; // Initially show the loader

  ngOnInit(): void {
    // Initialize or load data here if needed
  }

  ngAfterViewInit(): void {
    // Simulate a data loading process or perform any setup needed after view initialization
    // Set isLoading to false to hide the loader
    setTimeout(() => {
      this.isLoading = false;
    }, 350); // Example timeout, replace with real data loading logic
  }
}

