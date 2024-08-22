import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-home-trainee-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-trainee-tasks.component.html',
  styleUrl: './home-trainee-tasks.component.scss'
})
export class HomeTraineeTasksComponent {

  isOpen = false;
  doneShow:boolean=false
  progressShow:boolean=false
  todoShow:boolean=true

  ngOnInit(): void {
    this.toggleDropdown()
  }
  toggleDropdown() {
    $('.drobdown').slideToggle(200)
  }
  clickedShow(name:String):void{
    $('.drobdown').slideToggle()
    if (name=='done') {
      this.doneShow=true
      this.progressShow=false
      this.todoShow=false
    }
    else if(name=='progress'){
      this.doneShow=false
      this.progressShow=true
      this.todoShow=false
    }
    else{
      this.doneShow=false
      this.progressShow=false
      this.todoShow=true
    }
  }
}
