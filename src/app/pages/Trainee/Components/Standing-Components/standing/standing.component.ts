import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from '../../../Pipes/formatte-Date.pipe';
import { StandingService } from '../../../Services/standing.service';
declare var $: any;

@Component({
  selector: 'app-standing',
  standalone: true,
  imports: [CommonModule,FormatDatePipe],
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.scss'],
})
export class StandingComponent implements OnInit {

  // Inject services and dependencies
  _StandingsService = inject(StandingService)
  // Lifecycle hook that runs after the component initializes
  ngOnInit(): void {
    this.getAllStanding()
  }

  getAllStanding():void{
    this._StandingsService.getStanding().subscribe({
      next:({statusCode,data})=>{
        if(statusCode===200){
          console.log(data);

        }
      }
    })
  }
}
