import { Component } from '@angular/core';
import { MentornavComponent } from '../mentornav/mentornav.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mentor-layout',
  standalone: true,
  imports: [MentornavComponent,RouterOutlet,CommonModule],
  templateUrl: './mentor-layout.component.html',
  styleUrl: './mentor-layout.component.scss'
})
export class MentorLayoutComponent {
  camp : boolean = false;
constructor (){
  this.camp = localStorage.getItem('camp')? true : false;
}
}
