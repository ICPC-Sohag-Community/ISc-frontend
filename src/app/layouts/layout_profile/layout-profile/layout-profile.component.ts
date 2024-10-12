import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SecondNavbarComponent } from '../../layout_leader/components/second-navbar/second-navbar.component';
import { SidebarProfileComponent } from './components/sidebar-profile/sidebar-profile.component';

@Component({
  selector: 'app-layout-profile',
  standalone: true,
  imports: [RouterOutlet, SecondNavbarComponent, SidebarProfileComponent],
  templateUrl: './layout-profile.component.html',
  styleUrl: './layout-profile.component.scss',
})
export class LayoutProfileComponent {}
