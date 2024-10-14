import { Component } from '@angular/core';
import { SidebarProfileTmComponent } from '../components/sidebar-profile-tm/sidebar-profile-tm.component';
import { TopBarComponent } from '../../layout_trainee/components/top-bar/top-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-profile-trainee',
  standalone: true,
  imports: [SidebarProfileTmComponent, TopBarComponent, RouterOutlet],
  templateUrl: './layout-profile-trainee.component.html',
  styleUrl: './layout-profile-trainee.component.scss',
})
export class LayoutProfileTraineeComponent {}
