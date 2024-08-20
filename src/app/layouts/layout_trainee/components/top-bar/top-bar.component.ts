import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {


  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

}
