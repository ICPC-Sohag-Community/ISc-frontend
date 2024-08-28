import { Component } from '@angular/core';
import { MentorHeaderComponent } from '../../../layouts/mentor/mentor-header/mentor-header.component';
import { TrackingService } from '../services/tracking.service';
import { ResponseHeader } from '../../../shared/model/responseHeader';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [MentorHeaderComponent,CommonModule],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.scss'
})
export class TrackingComponent {
constructor (private serv:TrackingService){
this.get(this.id);
}
curr: any = {};
sheet: any = {};
contest: any = {};
id = localStorage.getItem("camp") || null;
  get(id:any){
    if(id != null){
      this.serv.getContest(id).subscribe((d:ResponseHeader)=>{
        this.contest = d.data;
        console.log(this.contest);
      });
      this.serv.getSheet(id).subscribe((d:ResponseHeader)=>{
        this.sheet = d.data;
        console.log(this.sheet);
      });
      this.curr = this.contest;
    }
  }
  she(){
    let e = document.getElementById('contest');
    let e1 = document.getElementById('she');
    let a = document.getElementById('sheet');
    let a1 = document.getElementById('cont');
    e?.classList.remove('hidden');
    e1?.classList.add('bg-[#3591C9]', 'text-white');
    e1?.classList.remove('border', 'text-[#3591C9]', 'border-[#3591C9]');
    a1?.classList.remove('bg-[#3591C9]', 'text-white');
    a1?.classList.add('border', 'text-[#3591C9]', 'border-[#3591C9]');
    a?.classList.add('hidden');
  }
  cont(){
    let e = document.getElementById('sheet');
    let e1 = document.getElementById('cont');
    let a = document.getElementById('contest');
    let a1 = document.getElementById('she');
    e?.classList.remove('hidden');
    e1?.classList.add('bg-[#3591C9]', 'text-white');
    e1?.classList.remove('border', 'text-[#3591C9]', 'border-[#3591C9]');
    a1?.classList.remove('bg-[#3591C9]', 'text-white');
    a1?.classList.add('border', 'text-[#3591C9]', 'border-[#3591C9]');
    a?.classList.add('hidden');
  }
}
