import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../authentication/services/auth.service';

@Component({
  selector: 'app-second-navbar',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './second-navbar.component.html',
  styleUrl: './second-navbar.component.scss',
})
export class SecondNavbarComponent implements OnInit {
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
    console.log(role.toLowerCase());
    this.router.navigate(['/', role.toLowerCase()]);
  }
}
