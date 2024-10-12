import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../../authentication/services/auth.service';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-profile',
  standalone: true,
  imports: [NgClass, RouterLinkActive, RouterLink],
  templateUrl: './sidebar-profile.component.html',
  styleUrl: './sidebar-profile.component.scss',
})
export class SidebarProfileComponent implements OnInit {
  authService = inject(AuthService);
  currentUser: any;
  role: any;

  isShow: boolean = false;
  // menu_show: boolean = true;

  show_menu(): void {
    this.isShow = !this.isShow;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
    // this.role = this.authService.currentUser().roleDto.roleName;
  }
}
