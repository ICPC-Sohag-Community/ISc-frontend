import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { TraineesService } from '../../../pages/mentor/services/trainees.service';
import { ResponseHeader } from '../../../shared/model/responseHeader';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mentor-header',
  standalone: true,
  imports: [NgClass,CommonModule],
  templateUrl: './mentor-header.component.html',
  styleUrl: './mentor-header.component.scss'
})
export class MentorHeaderComponent {
  campid:any;
change(id:any , name:any) {
  this.campid = id;
this.campName = name;
// this.train(this.campid , this.campName);

}
  camps: any;
  constructor(private service: TraineesService) {
    this.get();
    
  }
  campName:any = localStorage.getItem("cName")?localStorage.getItem("cName"): 'Select Camp';
  show() {
    this.isShow = !this.isShow;
    }
    isShow = false;
    get() {
      this.service.getData().subscribe((response: ResponseHeader) => {
        if (response.isSuccess) {
          this.camps = response.data;
          console.log(this.camps);
          // this.campid = this.camps[0].id || null;
          // this.campName = this.camps[0].name || null;
          // localStorage.setItem("cName" , this.campName);
        } else {
          this.campid =  null;
          console.error('Error:', response.message);
        }
      });
      
    }
    trainees:any;
    train(id:any, name:any) {
      this.service.trainees(id).subscribe((response: ResponseHeader) => {
        if (response.isSuccess) {
          this.trainees = response.data;
          console.log(this.trainees);
          localStorage.setItem("trainees" , JSON.stringify(this.trainees));
          this.change(id, name);
          localStorage.setItem("camp" , this.campid);
          
          localStorage.setItem("cName" , this.campName);
          this.campName = localStorage.getItem("cName")?localStorage.getItem("cName"): 'Select Camp';
          this.get();
          
          window.location.reload();
        } else {
          this.trainees =  null;
          console.error('Error:', response.message);
        }
      });
      this.isShow = !this.isShow;
    }
    
}
