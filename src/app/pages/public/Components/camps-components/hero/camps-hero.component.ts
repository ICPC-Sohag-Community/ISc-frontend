import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ResponsiveService } from '../../../Services/responsive.service';

@Component({
  selector: 'app-camps-hero',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './camps-hero.component.html',
  styleUrl: './camps-hero.component.scss'
})
export class CampsHeroComponent {
  // public _responsive = inject (ResponsiveService);
  // ngOnInit(): void {
  //   this._responsive.start()
  // }
  // ngOnDestroy(): void {
  //   this._responsive.destroy()
  // }

}
