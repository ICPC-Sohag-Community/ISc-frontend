import { Component } from '@angular/core';
import { TopBarComponent } from "./components/top-bar/top-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-trainee',
  standalone: true,
  imports: [TopBarComponent,RouterOutlet],
  templateUrl: './layout-trainee.component.html',
  styleUrl: './layout-trainee.component.scss'
})
export class LayoutTraineeComponent {

}
