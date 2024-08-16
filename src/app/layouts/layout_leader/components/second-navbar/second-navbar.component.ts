import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../authentication/services/auth.service';

@Component({
  selector: 'app-second-navbar',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './second-navbar.component.html',
  styleUrl: './second-navbar.component.scss',
})
export class SecondNavbarComponent {
  authService = inject(AuthService);

  isShow: boolean = false;
  menu_show_Profile = false;

  onShow() {
    this.isShow = !this.isShow;
  }

  showRoles() {
    this.isShow = !this.isShow;
  }
}
