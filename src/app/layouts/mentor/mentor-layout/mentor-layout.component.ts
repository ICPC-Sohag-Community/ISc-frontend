import { Component } from '@angular/core';
import { MentornavComponent } from '../mentornav/mentornav.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-mentor-layout',
  standalone: true,
  imports: [MentornavComponent,RouterOutlet],
  templateUrl: './mentor-layout.component.html',
  styleUrl: './mentor-layout.component.scss'
})
export class MentorLayoutComponent {

}
