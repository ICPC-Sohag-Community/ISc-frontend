import { Component } from '@angular/core';
import { SideComponent } from '../common/side/side.component';

import { RouterOutlet } from '@angular/router';
import { SecondNavbarComponent } from '../../layouts/layout_leader/components/second-navbar/second-navbar.component';
@Component({
  selector: 'app-hocdashboard',
  standalone: true,
  imports: [SideComponent ,SecondNavbarComponent,RouterOutlet],
  templateUrl: './hocdashboard.component.html',
  styleUrl: './hocdashboard.component.scss'
})
export class HOCDashboardComponent {

}
