import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../authentication/services/auth.service';
import { HomeService } from '../../../../pages/Trainee/Services/home.service';
declare var $: any;


@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  _authService = inject(AuthService);
  _homeService = inject(HomeService);
  router = inject(Router);
  isShow: boolean = false;
  currentUser: any;
  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.currentUser = this._authService.currentUser();
    // this.getQrCode
  }
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.isShow) {
      this.isShow = false;
    }
    if(clickedInside && !$('.dialog-container').hasClass('hidden')){
      this.toggleDialog()
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
  toggleDialog():void{
    $('.dialog-container').fadeToggle(150, function(){
      if($('.dialog-container').hasClass('hidden'))
      {
        $('.dialog-container').removeClass('hidden')
      }
      else
      {
        $('.dialog-container').addClass('hidden')
      }
    })
  }
  getQrCode():void{
    this._homeService.QRCode().subscribe({
      next:({statusCode,data})=>{
        console.log(statusCode,data);

      }
    })
  }


}
