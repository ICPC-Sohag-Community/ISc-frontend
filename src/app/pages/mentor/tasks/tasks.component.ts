import { Component, HostListener } from '@angular/core';
import { MentorHeaderComponent } from '../../../layouts/mentor/mentor-header/mentor-header.component';
import { ResponseHeader } from '../../../shared/model/responseHeader';
import { CommonModule } from '@angular/common';
import { TasksService } from '../services/tasks.service';
import { UtcToLocalPipe } from "../../../pipes/utc-to-local.pipe";
import { DatePickerComponent } from '../component/date-picker/date-picker.component';
import { UtcDatePipe } from '../../../pipes/utc-date.pipe';
import { FormsModule } from '@angular/forms';

import { LocaltoutcPipe } from '../../../pipes/localtoutc.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule,UtcDatePipe,MentorHeaderComponent,LocaltoutcPipe, CommonModule, UtcToLocalPipe,DatePickerComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  
  id:any
  // cancel(task : HTMLTextAreaElement){
  //   let x = this.ed.title;
  //   task.value = ''
  //   this.ed.title = x;
  //   this.show('edit');
  // }
isLoading:boolean = false;
  showElement = true;
  formatDate(date: string | Date): string {
    // Convert the date to ISO format (YYYY-MM-DD)
    return new Date(date).toISOString().substring(0, 10);
  }
 
  updateTitle(data : any, dat:any , end:any): void {
    this.errors= [];
    const dateObj = new Date();
    const date = new Date(dat.value);
    // Check if inputElement is not null and has a value
   const off = date.getTimezoneOffset();
    let e:Date;
    let s:Date;
    let task = {
      "taskId": this.ed.taskId,
      "title":  data.value,
      "startTime":  '',
      "endTime": '',
      "traineeId":  this.ed.traineeId
    }
    if(!dat.value){
      this.errors.push('Set Start Date');
    //    s = new Date(dat.value);
    // s.setMinutes(s.getMinutes() + off);
    // s.toISOString();
    }
    else{
      s = new Date(dat.value);
      s.setMinutes(s.getMinutes() + off);
      s.toISOString();
      task.startTime = s.toISOString();
    }
    if(!end.value){
      this.errors.push('Set End Date')
    }
    else{
      e = new Date(end.value);
      e.setMinutes(e.getMinutes() + off);
      e.toISOString();
      task.endTime = e.toISOString();
    }
    if(dat.value && end.value){
      this.serv.updTask(task).subscribe((d:ResponseHeader)=>{
        if (d.isSuccess) {
          this.ed.title = data.value;
          this.ed.startTime =s.toISOString();
          this.ed.endTime = e.toISOString();
         
            this.show('edit')
          
        }
        else{
          this.errors = [];
        
           for (const field in d.errors) {
              if (d.errors.hasOwnProperty(field)) {
                // Check if d.errors[field] is an array before using join
                if (Array.isArray(d.errors[field])) {
                  this.errors.push(` ${d.errors[field].join(', ')}`);
                } else {
                  this.errors.push(` ${d.errors[field]}`); // Directly push if not an array
                }
              }
            }
        }
      })
    }
    
    }
  err:any[] = [];
  errors:any = [];
  async create(task: HTMLTextAreaElement, startTime: HTMLInputElement, endTime: HTMLInputElement) {
    let start: Date | null = null;
    let st: string | null = null;
    let end: Date | null = null;
    let en: string | null = null;
  
    // Validate and convert input times if provided
    if ( endTime.value) {
     
  
      end = new Date(endTime.value);
      en = end.toISOString().replace('Z', ''); // Convert to string without 'Z'
    }
    if (startTime.value ) {
      start = new Date(startTime.value);
      st = start.toISOString().replace('Z', ''); // Convert to string without 'Z'
  
     
    }
  
    // Prepare the base data for the task creation
    const baseData = {
      title: task.value,
      startTime: st,
      endTime: en,
      traineesIds: this.trainTask,
      campId: Number(localStorage.getItem('camp')),
    };
  
    // Use a Set to avoid duplicate error messages
    const errorSet = new Set<string>();
  
    // Clear previous errors
    this.crError = [];
  
    // Track how many tasks were processed
    let successfulTasks = 0;
  
    // Loop through the taskNo array and create each task
    for (let i = 0; i < this.taskNo.length; i++) {
      if (this.taskNo[i] != null) {
        // Prepare individual task data
        const data = {
          title: this.taskNo[i] ? this.taskNo[i] : '',
          startTime: st ? st : '1970-01-01T00:00',
          endTime: en ? en : '1970-01-01T00:00',
          traineesIds: this.trainTask ? this.trainTask : '',
          campId: Number(localStorage.getItem('camp')),
        };
  
        // Await the response for each task
        const response = await this.addTaskAsync(data);
  
        if (!response.isSuccess) {
          // Collect errors for this task and avoid duplicates
          for (const field in response.errors) {
            if (response.errors.hasOwnProperty(field)) {
              if (Array.isArray(response.errors[field])) {
                response.errors[field].forEach((errMsg:any) => errorSet.add(`${errMsg}`));
              } else {
                errorSet.add(`${response.errors[field]}`);
              }
            }
          }
        } else {
          successfulTasks++; // Increment successful task count
        }
      }
    }
  
    // Check for missing trainees and tasks
    if (this.chars.length == 0) {
      errorSet.add('Please add at least one trainee.');
    }
    if (this.taskNo.length == 0) {
      errorSet.add('Add at least one task.');
    }
  
    // If there are any errors, add them to `this.crError`
    if (errorSet.size > 0) {
      this.crError = Array.from(errorSet);
    } else {
      // If no errors, refresh data and reset state
      this.get(localStorage.getItem('camp'));
      this.show('add');
      this.taskNo = [];
      this.chars = [];
      this.trainTask = [];
    }
  }
  
  // Create a wrapper function for `addTask` to use with `await`
  addTaskAsync(data: any): Promise<ResponseHeader> {
    return new Promise((resolve) => {
      this.serv.addTask(data).subscribe((response: ResponseHeader) => {
        resolve(response);
      });
    });
  }
  
  
  
crError: any[] = [];
del(id:any){
  let data = {
    "taskId":id
  }
  
  this.serv.del(id).subscribe((d:ResponseHeader)=>{
    
   if(d.isSuccess){
    document.getElementById( 'D' + id)?.remove();
    this.refreshRouterOutlet();
   }
  })
}
taskNo:any[] = [];
onKeydown(event: KeyboardEvent, task: any) {
  let v = task.value;

  // Check if the Enter key was pressed and the input is not just whitespace
  if (event.key === 'Enter' && v.replace(/\s+/g, '') !== '' && !event.shiftKey)  {
    event.preventDefault(); // Prevents default newline behavior in textarea or input
    this.taskNo.push(task.value);
    task.value = ''; // Clears the input
  }
}

en(event: KeyboardEvent, task: any, val: any) {
  // Check if the Enter key was pressed and the input is not just whitespace
  if (event.key === 'Enter' && val.value.replace(/\s+/g, '') !== '' && !event.shiftKey) {
    event.preventDefault(); // Prevents default newline behavior
    this.enable('en' + task);
    this.taskNo[task] = val.value;
    val.value = ''; // Clears the input
    
  }
}

handleClick(event: Event) {
  const element = event.target as HTMLElement;
  if(element.id != 'names' && element.id != 'rel' && this.isShow){
    this.show('names');
    
  }
  event.stopPropagation();  
  
}
handle(event: Event) {
  
  event.stopPropagation();  
  
}
removeGrandparent(id:any, ind:any) {
 
  
  const grandparent = this.getGrandparentElement(id);

  if (grandparent) {
    
    this.taskNo.splice(ind, 1);
  }
  
}

getGrandparentElement(id:any): HTMLElement  {
  // Traverse the DOM to find the grandparent
  let element: any = document.getElementById(id);
  if (element) {
    // Traverse up two levels to find the grandparent
    element = element.parentElement?.parentElement ;
  }
  return element;
}
chars:any[]=[];
add(id: string,trainee: any, f:String , l:String) {
  let e = document.getElementById(id);
  e?.classList.toggle("hidden");
  let char = f[0].toUpperCase() + l[0].toUpperCase();
 if( e?.classList.contains('hidden')){
  this.trainTask = this.trainTask.filter(item => item !== trainee);
  this.chars = this.chars.filter(item => item !== char);
 }
 else{
  
  if(!this.chars.includes('ALL')){
    this.trainTask.push(trainee);
    this.chars.push(char);
  }

 }
 
}
getFullPath(route: ActivatedRoute): string {
  let path = route.snapshot.url.map(segment => segment.path).join('/');

  // Recursively add paths from child routes if they exist
  if (route.firstChild) {
    path += '/' + this.getFullPath(route.firstChild);
  }
  return path;
}
 refreshRouterOutlet() {
    this.router.navigateByUrl('/mentor/blank' , { skipLocationChange: true }).then(() => {
      
      this.router.navigate(['mentor/' + this.getFullPath(this.activatedRoute)]);
    });
  }
  constructor(private serv : TasksService ,  private router: Router, private activatedRoute: ActivatedRoute){

   if(localStorage.getItem("camp")){
      this.get(localStorage.getItem("camp"));
      this.train(localStorage.getItem("camp"));
      this.assig();
      this.id = 1
      
    }
    else{
      this.tasks = null;
      this.id = null
    }
    
  }
  trainTask:any[] = [];
  tasks: any = {};
  assign:any;
  assig(){
    this.serv.getAssign(localStorage.getItem("camp")).subscribe((d:ResponseHeader)=>{
      this.assign = d.data;
      
    })
  }
  trainee: any ;
  show(id:string){
    this.err = [];
    this.crError = [];
    this.errors = [];
    document.getElementById(id)?.classList.toggle("hidden");
    if(id == "names"){

      this.isShow = !this.isShow
    }
    if(id == 'add'){
      document.getElementById('names')?.classList.add("hidden");
      this.isShow = false;
      
    }
  }
  get(id:any){
    this.isLoading = true;
    if(id != null){
      this.serv.getData(id).subscribe((d:ResponseHeader)=>{
        this.tasks = d.data;
        
        this.isLoading = false;

      })
    }
  }
  train(id:any){
    this.isLoading = true;
    if(id != null){
      this.serv.trainees(id).subscribe((d:ResponseHeader)=>{
        this.trainee = d.data;
        this.isLoading = false;
      })
    }
  }
  isShow = false;
  enable(id:any){
    
      document.getElementById(id)?.removeAttribute("disabled");
    
    
  }
  ed={
    "traineeId": "string",
    "taskId": 0,
    "firstName": "string",
    "middleName": "string",
    "lastName": "string",
    "photoUrl": null,
    "title": "string",
    "startTime": "2024-09-09T22:58:58.793Z",
    "endTime": "2024-09-09T22:58:58.793Z",
  }
  edit(data:any){
    this.ed=data;
    this.ed.taskId = data.id;
    this.ed.title = data.title;
    // this.ed = {
    //   "taskId": data.taskId,
    //   "title":  data.title,
    //   "startTime":  data.startTime,
    //   "endTime":  data.endTime,
    //   "traineeId":  data.traineeId
    // }
    let x = document.getElementById('edTitle') as HTMLTextAreaElement | null;
    if(x){
      x.value = this.ed.title;
    }
    this.show('edit');
   
  }
  gen(){
    this.chars = [];
    this.chars.push('ALL');
    this.trainTask = [];
    if(document.getElementById('gen')?.classList.contains('hidden')){
      this.trainee.forEach((e: any) => {
      this.trainTask.push(e.id);
      document.getElementById(`n${e.id}`)?.classList.remove('hidden');
  });
    }
    else{
    this.chars = [];
    this.trainTask = [];
    this.trainee.forEach((e: any) => {
      document.getElementById(`n${e.id}`)?.classList.add('hidden');
  });
    }

    
  this.show('gen');
  
  }
  @HostListener('document:click', ['$event'])
onClickOutside(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  // Check if the click was outside the dropdown and the related button
  if (!target.closest('.relative') ) {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => dropdown.classList.add('hidden'));
  }
}
getStat(start:any , end:any){
let d = new Date();
start = new Date(start)
end = new Date(end)
const timezoneOffset = d.getTimezoneOffset(); // This is in minutes

// Adjust the start and end dates by adding the timezone offset
start.setMinutes(start.getMinutes() - timezoneOffset);
end.setMinutes(end.getMinutes() - timezoneOffset);
if(d.getTime()>= start.getTime() && d.getTime()<= end.getTime()){
return 1;
}
else if (d.getTime()< start.getTime() ){
  return 2;
  }
  else{
    return 0;
  }

}

}
