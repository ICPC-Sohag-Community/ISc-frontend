import { Component } from '@angular/core';
import { StandingComponent } from '../../Components/Standing-Components/standing/standing.component';

@Component({
  selector: 'app-standing-trainee',
  standalone: true,
  imports: [StandingComponent],
  templateUrl: './standing-trainee.component.html',
  styleUrl: './standing-trainee.component.scss'
})
export class StandingTraineeComponent {
  isLoading = true; // Initially show the loader

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 700);
  }
}
