// import { CommonModule } from '@angular/common';
// import { Component, inject } from '@angular/core';
// import { HomeService } from '../../Services/home.service';
// import { task } from '../../model/trinee-data';
// declare var $: any;
// @Component({
//   selector: 'app-home-trainee-tasks',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './home-trainee-tasks.component.html',
//   styleUrl: './home-trainee-tasks.component.scss'
// })
// export class HomeTraineeTasksComponent {


//   _homeService = inject(HomeService)
//   todoTasks:task[]=[]
//   inProgressTasks:task[]=[]
//   doneTasks:task[]=[]



//   ngOnInit(): void {
//     this.loadTraineeTasks()
//   }


//   toggleTables(tableClosed:any) {

//     if(tableClosed=='todo'){
//       $('.todo-table').slideToggle(500)
//       $('.todo-arrow').toggleClass('rotate')
//     }
//     else if(tableClosed=='progress')
//     {
//       $('.progress-table').slideToggle(500)
//       $('.progress-arrow').toggleClass('rotate')

//     }
//     else
//     {
//       $('.done-table').slideToggle(500)
//       $('.done-arrow').toggleClass('rotate')
//     }


//   }
//   toggleList(listClosed:any,id:any):void{

//     if(listClosed=='list-todo'){
//       $(`#${id}`).slideToggle(300)
//     }
//     else if(listClosed=='list-progress')
//     {
//       $(`#${id}`).slideToggle(300)
//     }
//     else
//     {
//       $(`#${id}`).slideToggle(300)
//     }
//   }

//   loadTraineeTasks():void{
//     this._homeService.TraineeTasks().subscribe({
//       next:({statusCode,data})=>{
//         if(statusCode===200){
//           this.todoTasks=this.getTasksByStatus(data,0)
//           this.inProgressTasks=this.getTasksByStatus(data,1)
//           this.doneTasks=this.getTasksByStatus(data,2)
//         }
//       }
//     })
//   }
//   changeTaskStatus(task:any,status:any):void{
//     const model =
//      {
//       taskId:task.id,
//       status:status

//     }
//     this._homeService.UpdateTraineeTask(model).subscribe({
//       next:({statusCode,data})=>{
//         if(statusCode===200){
//           this.loadTraineeTasks()
//         }
//       }
//     })
//     $(`#${task.id}`).slideToggle(300)

//   }
//   getTasksByStatus(data:any, status: number): [] {
//     const statusData = data.find((item: { status: number; }) => item.status === status);
//     return statusData ? statusData.task : [];
//   }


// }
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { task } from '../../model/trinee-data';
declare var $: any;

@Component({
  selector: 'app-home-trainee-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-trainee-tasks.component.html',
  styleUrls: ['./home-trainee-tasks.component.scss']
})
export class HomeTraineeTasksComponent implements OnInit {

  // Inject HomeService to handle task-related operations
  private _homeService = inject(HomeService);

  // Arrays to hold tasks based on their status
  todoTasks: task[] = [];
  inProgressTasks: task[] = [];
  doneTasks: task[] = [];

  // Lifecycle hook to load tasks when the component initializes
  ngOnInit(): void {
    this.loadTraineeTasks();
  }

  // Load tasks from the server and categorize them based on their status
  loadTraineeTasks(): void {
    this._homeService.TraineeTasks().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.todoTasks = this.getTasksByStatus(data, 0);
          this.inProgressTasks = this.getTasksByStatus(data, 1);
          this.doneTasks = this.getTasksByStatus(data, 2);
        }
      }
    });
  }

  // Change the status of a task and reload the tasks
  changeTaskStatus(task: task, status: number): void {
    const model = {
      taskId: task.id,
      status: status
    };

    this._homeService.UpdateTraineeTask(model).subscribe({
      next: ({ statusCode }) => {
        if (statusCode === 200) {
          this.loadTraineeTasks();
        }
      }
    });

    // Hide the task list after updating the status
    $(`#${task.id}`).slideToggle(300);
  }

  // Utility method to filter tasks by status
  getTasksByStatus(data: any, status: number): task[] {
    const statusData = data.find((item: { status: number }) => item.status === status);
    return statusData ? statusData.task : [];
  }

   // Toggle the visibility of the task tables
   toggleTables(tableClosed: string): void {
    if (tableClosed === 'todo') {
      $('.todo-table').slideToggle(500);
      $('.todo-arrow').toggleClass('rotate');
    } else if (tableClosed === 'progress') {
      $('.progress-table').slideToggle(500);
      $('.progress-arrow').toggleClass('rotate');
    } else if (tableClosed === 'done') {
      $('.done-table').slideToggle(500);
      $('.done-arrow').toggleClass('rotate');
    }
  }
    // Toggle the visibility of task lists within each category
    toggleList(id: string): void {
      $(`#${id}`).slideToggle(300);
    }

}
