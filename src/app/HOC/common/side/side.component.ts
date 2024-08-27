import { Component, inject } from '@angular/core';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [],
  templateUrl: './side.component.html',
  styleUrl: './side.component.scss'
})
export class SideComponent {
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
