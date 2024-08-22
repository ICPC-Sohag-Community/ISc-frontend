import { CommonModule } from '@angular/common';
import {  Component, inject, OnInit } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { Mentor } from '../../model/trinee-data';

@Component({
  selector: 'app-trainee-home-mentor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainee-home-mentor.component.html',
  styleUrl: './trainee-home-mentor.component.scss'
})
export class TraineeHomeMentorComponent implements OnInit {

  _homeService = inject(HomeService)
  mentorData:Mentor={} as Mentor

  ngOnInit(): void {
      this.loadMentorInfo()
  }
  private loadMentorInfo () : void{
    this._homeService.MentorInfo().subscribe({
      next:( { statusCode,data } )=>{
        if( statusCode === 200 )
        {
          this.mentorData = data
          console.log(data);
        }

      }
    })
  }


  }


