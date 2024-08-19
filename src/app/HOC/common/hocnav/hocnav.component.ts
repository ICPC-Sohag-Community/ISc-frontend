import { Component, inject } from '@angular/core';
import { AuthService } from '../../../authentication/services/auth.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-hocnav',
  standalone: true,
  imports: [NgClass],
  templateUrl: './hocnav.component.html',
  styleUrl: './hocnav.component.scss'
})
export class HocnavComponent {
  authService = inject(AuthService);
}
