import { Component } from '@angular/core';
import { MentorHeaderComponent } from '../../../layouts/mentor/mentor-header/mentor-header.component';
import { StandingsService } from '../services/standings.service';
import { ResponseHeader } from '../../../shared/model/responseHeader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [MentorHeaderComponent,CommonModule],
  templateUrl: './standings.component.html',
  styleUrl: './standings.component.scss'
})
export class StandingsComponent {
  change(index: number, i: string, inc: boolean, points: number) {
    // Ensure stand[index] and stand[index].achivers are defined before proceeding
    if (this.stand && this.stand.achivers[index]) {
        
       let data = {
          id : i,
          isIncreasing : inc
        }
        this.serv.updateData(data).subscribe((resp : ResponseHeader)=>{
          if(resp.statusCode == 200){
            const currentPoints = this.stand.achivers[index].points || 0;
            this.stand.achivers[index].points = inc ? currentPoints + 10 : currentPoints - 10;
          }
        })
    } else {
        console.error(`Stand or Achivers not found at index ${index}`);
    }
}
  constructor(private serv:StandingsService){
    if(localStorage.getItem("camp")){
      this.get(localStorage.getItem("camp"));
    }
    else{
      this.stand = null;
    }
  }
  stand: any = {};

  get(id:any){
    if(id != null){
      this.serv.getData(id).subscribe((d:ResponseHeader)=>{
        this.stand = d.data;
        console.log(this.stand)
      })
    }
  }
}