import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HomeService } from '../../../Services/home.service';

@Component({
  selector: 'app-incoming-cards',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './incoming-cards.component.html',
  styleUrl: './incoming-cards.component.scss'
})
export class IncomingCardsComponent {

  private _homeService = inject (HomeService)

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData():void{
    this._homeService.getincomingCamps().subscribe({
      next:({data,statusCode})=>{
        console.log(data ,statusCode);

      }
    })
  }

}
