import { Component, HostListener } from '@angular/core';
import { MentorHeaderComponent } from '../../../layouts/mentor/mentor-header/mentor-header.component';
import { ResponseHeader } from '../../../shared/model/responseHeader';
import { CommonModule } from '@angular/common';
import { TasksService } from '../services/tasks.service';
import { UtcToLocalPipe } from "../../../pipes/utc-to-local.pipe";
import { DatePickerComponent } from '../component/date-picker/date-picker.component';
import { UtcDatePipe } from '../../../pipes/utc-date.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule,UtcDatePipe,MentorHeaderComponent, CommonModule, UtcToLocalPipe,DatePickerComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  id:any
isLoading:boolean = false;
  showElement = true;
  formatDate(date: string | Date): string {
    // Convert the date to ISO format (YYYY-MM-DD)
    return new Date(date).toISOString().substring(0, 10);
  }
 
  updateTitle(data:any, dat:any): void {
    
    const dateObj = new Date();
    const date = new Date(dat.value);
    // Check if inputElement is not null and has a value
    if (data.value && date.getTime() > dateObj.getTime() && date.getDate() != dateObj.getDate() ) {
      this.ed.title = data.value;
      this.ed.deadLine = dat.value;
      console.log(this.ed)
      this.serv.updTask(this.ed).subscribe((d:ResponseHeader)=>{
        console.log(d);
        this.show('edit')
      })
    }
    else{
      console.log(dat.value )
      alert('Enter a deadline in the future')
    }
  }
  
  err:any[] = [];
create(task: HTMLTextAreaElement ,date: HTMLInputElement ) {
  const deadlineDate = new Date(date.value);
  const utcDeadline = deadlineDate.toISOString().replace('Z', '');
let data = {
  "title":task.value,
  "deadLine" : utcDeadline,
  "traineesIds": this.trainTask,
  "campId":Number(localStorage.getItem("camp")) 
}
console.log(data);

this.taskNo.forEach(element => {
  if(element != null){
    data = {
      "title":element,
      "deadLine" : utcDeadline,
      "traineesIds":this.trainTask ,
      "campId":Number(localStorage.getItem("camp"))
    }
    this.serv.addTask(data).subscribe((d:ResponseHeader)=>{
      if(!d.isSuccess){
        this.err= d.errors;
        
          if(d.errors.DeadLine){
            alert("Deadline must be in future");
          }
          else{
            alert("All fields are required");
          }
        
      }
      else{
        console.log(d.message);
        window.location.reload();
      }
      })
  }
});


}
del(id:any){
  let data = {
    "taskId":id
  }
  console.log(data)
  this.serv.del(id).subscribe((d:ResponseHeader)=>{
    console.log(d);
    document.getElementById(id)?.remove()
  })
}
taskNo:any[] = [];
onKeydown(event: KeyboardEvent, task:any) {
  if (event.key === 'Enter') {
    this.taskNo.push(task.value);
    let e = document.getElementById('tasks');
    task.value = ''
  }
}
en(event: KeyboardEvent, task:any, val:any) {
  if (event.key === 'Enter') {
    this.enable('en'+ task);
    this.taskNo[task] = val.value;
    console.log(this.taskNo)
  }
}
handleClick(event: Event) {
  event.stopPropagation();  
  
}
removeGrandparent(id:any, ind:any) {
  console.log(id);
  
  const grandparent = this.getGrandparentElement(id);

  if (grandparent) {
    
    this.taskNo[ind] = null;
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
  this.trainTask.push(trainee);
  this.chars.push(char);

 }
 console.log(this.chars)
}
  constructor(private serv : TasksService){

   if(localStorage.getItem("camp")){
      this.get(localStorage.getItem("camp"));
      this.train(localStorage.getItem("camp"));
      this.id = 1
      this.assig()
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
    this.serv.getAssign().subscribe((d:ResponseHeader)=>{
      this.assign = d.data;
      console.log(this.assign);
    })
  }
  trainee: any ;
  show(id:string){
    document.getElementById(id)?.classList.toggle("hidden");
    if(id == "names"){
      this.isShow = !this.isShow
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
    if(document.getElementById(id)?.hasAttribute("disabled")){
      document.getElementById(id)?.removeAttribute("disabled");
    }
    else{
      document.getElementById(id)?.setAttribute("disabled" , "")
    }
  }
  ed={
    "traineeId": "string",
    "taskId": 0,
    "firstName": "string",
    "middleName": "string",
    "lastName": "string",
    "photoUrl": null,
    "title": "string",
    "deadLine": "2024-08-29T23:26:41.756Z"
  }
  edit(data:any){
    this.ed=data;
    this.show('edit');
    console.log(this.ed);
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
  console.log(this.trainTask);
  }
  @HostListener('document:click', ['$event'])
onClickOutside(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  // Check if the click was outside the dropdown and the related button
  if (!target.closest('.relative') && !target.closest('.dropdown')) {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => dropdown.classList.add('hidden'));
  }
}

}
