import { NgClass } from '@angular/common';

import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';
@Component({
  selector: 'app-mentornav',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './mentornav.component.html',
  styleUrl: './mentornav.component.scss',
})
export class MentornavComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  isShow: boolean = false;
  currentUser: any;
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser();
  }

  showRoles() {
    this.isShow = !this.isShow;
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.isShow) {
      this.isShow = false;
    }
  }

  goSpecificRole(role: string): void {
    this.router.navigate(['/', role.toLowerCase()]);
  }
  goToProfile(): void {
    this.router.navigate(['/profile/mentor']);
  }
}
