import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../authentication/services/auth.service';


@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isShow: boolean = false;
  currentUser: any;
  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser();
  }
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.isShow) {
      this.isShow = false;
    }
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  showRoles() {
    this.isShow = !this.isShow;
  }
  goSpecificRole(role: string): void {
    this.router.navigate(['/', role.toLowerCase()]);
  }


}
