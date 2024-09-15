import { CommonModule, NgClass } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { MentorHeaderComponent } from '../../../layouts/mentor/mentor-header/mentor-header.component';
import { TraineesService } from '../services/trainees.service';
import { ResponseHeader } from '../../../shared/model/responseHeader';


@Component({
  selector: 'app-trainees',
  standalone: true,
  imports: [CommonModule,NgClass, MentorHeaderComponent],
  templateUrl: './trainees.component.html',
  styleUrls: ['./trainees.component.scss'] // Fixed typo
})
export class TraineesComponent {
  isLoading : boolean = true;
  trainee = false;
  camps: any;
  activeTrainee = {
    id: "string",
    firstName: "string",
    middleName: "string",
    lastName: "string",
    college: "0",
    phoneNumber: "string",
    photoUrl: "string",
    facebookLink: "string",
    codeForceHandle: "string"
  };
  handleClick(event: Event) {
    event.stopPropagation();  
    
  }
  constructor(private renderer: Renderer2 , private serv:TraineesService){
    
this.isLoading = true;
  
    if(localStorage.getItem("camp")){
      this.camps = localStorage.getItem("trainees");
      this.camps = JSON.parse(this.camps)
      this.isLoading = false;
    }
    else {
      this.camps = null;
      this.isLoading = false;
    }
  }
  info:any = {
    email: "user208@example.com",
    gender: 1,
    grade: 4,
    vjudgeHandle: null
  };
id:any;
mb:boolean = false;
  showTrainee(id:any) {
    if(id == this.camps.length - 1 &&(this.camps.length )%(Math.floor((window.innerWidth - 112) / 300)) == 1){
      this.mb = true
    }
    this.activeTrainee = this.camps[id];
    this.trainee = true;
    this.id = id;
    this.serv.info(this.activeTrainee.id).subscribe((response: ResponseHeader) => {
      if (response.isSuccess) {
       this.info = response.data;
       const element = this.renderer.selectRootElement(`#z${id}`, true);
    const element2 = this.renderer.selectRootElement(`#x${id}`, true);
    this.renderer.addClass(element, 'block');
    this.renderer.removeClass(element, 'hidden');
    this.renderer.addClass(element2, 'absolute');
    this.renderer.addClass(element2, 'z-40');
    this.renderer.addClass(element2, 'left-[-40px]');
    this.renderer.addClass(element2, 'w-[380px]');
    this.renderer.addClass(element2, 'top-[-70px]');
    
      } else {
        
        
      }
    });
    
    
  }

  hideTrainee() {
    this.mb = false
    this.trainee = false;
    const element = this.renderer.selectRootElement(`#z${this.id}`, true);
    const element2 = this.renderer.selectRootElement(`#x${this.id}`, true);
    this.renderer.removeClass(element, 'block');
    this.renderer.addClass(element, 'hidden');
    this.renderer.removeClass(element2, 'absolute');
    this.renderer.removeClass(element2, 'z-40');
    this.renderer.removeClass(element2, 'w-[380px]');
  }

 
}
