import { NgClass } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnChanges,
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
  elementRef = inject(ElementRef);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  isShow: boolean = false;
  currentUser: any;
  roles: string[] = [];
  currentPath: string = '';

  ngOnInit() {
    this.currentUser = this.authService.currentUser();
    this.currentPath = this.router.url;
    this.loadRoles();
    this.detectLocalStorageChange();
  }
  loadRoles(): void {
    const storedData = JSON.parse(localStorage.getItem('CURRENT_USER') || '{}');
    this.roles = storedData.roles || [];
    this.cdr.detectChanges();
  }

  detectLocalStorageChange(): void {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = (key: string, value: string): void => {
      originalSetItem.apply(localStorage, [key, value]);
      if (key === 'CURRENT_USER') {
        this.loadRoles();
      }
    };
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
