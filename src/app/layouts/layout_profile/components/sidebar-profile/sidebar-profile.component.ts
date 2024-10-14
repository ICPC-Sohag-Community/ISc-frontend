import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../authentication/services/auth.service';

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

  isShow: boolean = false;

  show_menu(): void {
    this.isShow = !this.isShow;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
  }
}
