// import { Component, signal } from '@angular/core';
// import { TraineeCardsComponent } from "../../Components/trainee-cards/trainee-cards.component";
// import { TraineeHomeMentorComponent } from "../../Components/trainee-home-mentor/trainee-home-mentor.component";
// import { HeadsCarouselComponent } from '../../Components/heads-carousel/heads-carousel.component';
// import { CommonModule } from '@angular/common';
// import { HomeTraineeTasksComponent } from '../../Components/home-trainee-tasks/home-trainee-tasks.component';
// import { TraineeChartComponent } from "../../Components/trainee-chart/trainee-chart.component";


// @Component({
//   selector: 'app-home-trainee',
//   standalone: true,
//   imports: [TraineeCardsComponent, TraineeHomeMentorComponent, HeadsCarouselComponent, HomeTraineeTasksComponent,TraineeChartComponent, TraineeChartComponent,CommonModule],
//   templateUrl: './home-trainee.component.html',
//   styleUrl: './home-trainee.component.scss'
// })
// export class HomeTraineeComponent {
//   isLoading = true;
//   ngAfterViewInit(): void {
//     // this.isLoading.set(false)
//     this.isLoading=false
//     // You can now safely access the DOM elements here.
//   }

// }
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TraineeCardsComponent } from "../../Components/trainee-cards/trainee-cards.component";
import { TraineeHomeMentorComponent } from "../../Components/trainee-home-mentor/trainee-home-mentor.component";
import { HeadsCarouselComponent } from '../../Components/heads-carousel/heads-carousel.component';
import { CommonModule } from '@angular/common';
import { HomeTraineeTasksComponent } from '../../Components/home-trainee-tasks/home-trainee-tasks.component';
import { TraineeChartComponent } from "../../Components/trainee-chart/trainee-chart.component";

@Component({
  selector: 'app-home-trainee',
  standalone: true,
  imports: [
    TraineeCardsComponent,
    TraineeHomeMentorComponent,
    HeadsCarouselComponent,
    HomeTraineeTasksComponent,
    TraineeChartComponent,
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

