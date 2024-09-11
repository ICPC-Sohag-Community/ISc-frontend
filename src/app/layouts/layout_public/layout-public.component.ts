import { Component } from '@angular/core';
import { TopBarComponent } from "../layout_public/components/top-bar/top-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-public',
  standalone: true,
  imports: [TopBarComponent,RouterOutlet],
  templateUrl: './layout-public.component.html',
  styleUrl: './layout-public.component.scss'
})
export class LayoutPublicComponent {

}
