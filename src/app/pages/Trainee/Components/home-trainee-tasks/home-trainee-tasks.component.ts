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




  
  toggleTables(tableClosed:any) {

    if(tableClosed=='todo'){
      $('.todo-table').slideToggle(500)
    }
    else if(tableClosed=='progress')
    {
      $('.progress-table').slideToggle(500)
    }
    else
    {
      $('.done-table').slideToggle(500)
    }


  }
}
