import { Component } from '@angular/core';
import { TraineeHeaderComponent } from "../../Components/trainee-header/trainee-header.component";
import { TraineeHomeBodyComponent } from "../../Components/trainee-home-body/trainee-home-body.component";
import { HeadsCarouselComponent } from '../../Components/heads-carousel/heads-carousel.component';
import { CommonModule } from '@angular/common';
import { HomeTraineeTasksComponent } from '../../Components/home-trainee-tasks/home-trainee-tasks.component';


@Component({
  selector: 'app-home-trainee',
  standalone: true,
  imports: [TraineeHeaderComponent, TraineeHomeBodyComponent,HeadsCarouselComponent,HomeTraineeTasksComponent,CommonModule],
  templateUrl: './home-trainee.component.html',
  styleUrl: './home-trainee.component.scss'
})
export class HomeTraineeComponent {

}
