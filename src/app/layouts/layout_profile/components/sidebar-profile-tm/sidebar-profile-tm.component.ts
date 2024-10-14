import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../authentication/services/auth.service';

@Component({
  selector: 'app-sidebar-profile-tm',
  standalone: true,
  imports: [NgClass, RouterLinkActive, RouterLink],
  templateUrl: './sidebar-profile-tm.component.html',
  styleUrl: './sidebar-profile-tm.component.scss',
})
export class SidebarProfileTmComponent implements OnInit {
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
