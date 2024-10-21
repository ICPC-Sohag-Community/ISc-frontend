
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
  imports: [NgClass,RouterLink,RouterLinkActive],
  templateUrl: './mentornav.component.html',
  styleUrl: './mentornav.component.scss'
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
  show(id:string){
    
    document.getElementById(id)?.classList.toggle("hidden");
    
  }
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.isShow) {
      this.isShow = false;
    }
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Check if the click was outside the dropdown and the related button
    if (!target.closest('.trag') ) {
      document.getElementById('nav')?.classList.add("hidden");
    }
  }
  goSpecificRole(role: string): void {
    this.router.navigate(['/', role.toLowerCase()]);
  }
}
