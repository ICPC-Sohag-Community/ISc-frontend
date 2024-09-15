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
 
  updateTitle(data : any, dat:any , end:any): void {
    
    const dateObj = new Date();
    const date = new Date(dat.value);
    // Check if inputElement is not null and has a value
   
    
    let task = {
      "taskId": this.ed.taskId,
      "title":  data.value,
      "startTime":  dat.value,
      "endTime":  end.value,
      "traineeId":  this.ed.traineeId
    }
    this.serv.updTask(task).subscribe((d:ResponseHeader)=>{
      if (d.isSuccess) {
        this.ed.title = data.value;
        this.ed.startTime = dat.value;
        this.ed.endTime = end.value;
        console.log(task)
          console.log(d);
          this.show('edit')
        
      }
      else{
        this.errors = [];
        console.log(task)
        console.log(d )
        for (const field in d.errors) {

          if (d.errors.hasOwnProperty(field)) {
            this.errors.push(`${field}: ${d.errors[field].join(', ')}`);
          }
        }
      }
    })
    }
  err:any[] = [];
  errors:any = [];
create(task: HTMLTextAreaElement ,startTime: HTMLInputElement,endTime: HTMLInputElement ) {
  let start :any;
  let st :any;
  let end :any;
  let en :any;
  let flag = false;
  if(startTime.value && endTime.value){
     start = startTime.value? new Date(startTime.value): null;
   st = start?start.toISOString().replace('Z', '') : null;
   end = new Date(endTime.value);
   en = end?end.toISOString().replace('Z', '') : null;
  }
let data = {
  "title":task.value,
  "startTime": st,
  "endTime": en,
  "traineesIds": this.trainTask,
  "campId":Number(localStorage.getItem("camp")) 
}
console.log(data);
this.crError = [];
this.taskNo.forEach(element => {
  if(element != null){
    data = {
      "title":element,
      "startTime": st,
  "endTime": en,
      "traineesIds":this.trainTask ,
      "campId":Number(localStorage.getItem("camp"))
    }
    if(st && en && this.chars.length != 0 && this.taskNo.length != 0){
    this.serv.addTask(data).subscribe((d:ResponseHeader)=>{
      if(!d.isSuccess){
        
        this.crError.push('All fields are required');
        for (const field in d.errors) {

          if (d.errors.hasOwnProperty(field)) {
            this.crError.push(`${field}: ${d.errors[field].join(', ')}`);
          }
        }
        
      }
      else{
        console.log(d.message);
        this.get(localStorage.getItem("camp"));
        this.show('add');
        // window.location.reload();
        
      }
      })  
    }
    else if (!st || !en || this.chars.length == 0 || this.taskNo.length == 0){
      this.crError.push('All fields are required');
    }
    
    
    
  }
  
});
if(this.taskNo.length == 0)
 
    this.crError.push('All fields are required');
  
}
crError: any[] = [];
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
    console.log(this.taskNo);
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
  
  if(!this.chars.includes('ALL')){
    this.trainTask.push(trainee);
    this.chars.push(char);
  }

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
    this.err = [];
    this.crError = [];
    this.errors = [];
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
        console.log(d)
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
    // this.ed = {
    //   "taskId": data.taskId,
    //   "title":  data.title,
    //   "startTime":  data.startTime,
    //   "endTime":  data.endTime,
    //   "traineeId":  data.traineeId
    // }
    this.show('edit');
    console.log(this.ed);
    console.log(data);
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
getStat(start:any , end:any){
let d = new Date();
start = new Date(start)
end = new Date(end)

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
