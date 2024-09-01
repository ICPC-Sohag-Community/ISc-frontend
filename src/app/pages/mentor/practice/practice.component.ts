import { Component } from '@angular/core';
import { PracticeService } from '../services/practice.service';
import { ResponseHeader } from '../../../shared/model/responseHeader';
import { CommonModule } from '@angular/common';
import { UtcToLocalPipe } from '../../../pipes/utc-to-local.pipe';
import { LocalTimePipe } from '../../../pipes/local-time.pipe';
import { FormsModule } from '@angular/forms';
import { UtcDatePipe } from '../../../pipes/utc-date.pipe';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [FormsModule,CommonModule,UtcToLocalPipe,LocalTimePipe,UtcDatePipe],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.scss'
})
export class PracticeComponent {
  private utc = new UtcDatePipe();
dateEd: any;
titleEd: any;
linkEd: any;
notesEd: any;
  statusEd: any = 1;
  timeEd: any;
  idEd: any;
upd(ind:any , item:any) {

item.state = this.stand[ind].state;

 let i = {
  "practiceId": item.id,
  "title": item.title,
  "meetingLink": item.meetingLink,
  "note": item.note,
  "time": item.time  ,
  "state": item.state
}
console.log(i);
this.serv.upd(i).subscribe((d:ResponseHeader)=>{
  if(this.stand[ind].state == 1){
    this.stand[ind].state = this.stand[ind].state + 1;
  }
  else{
    this.stand[ind].state = this.stand[ind].state - 1;
  }
})
}
del(id: any) {
this.serv.del(id).subscribe((d:ResponseHeader)=>{
  console.log(d);
  if(d.isSuccess){
    document.getElementById("d" + id)?.remove();
  }
  
})
}
edit(data: any) {
  this.dateEd = data.time;
this.titleEd = data.title;
this.linkEd = data.meetingLink;
this.notesEd = data.note;
this.statusEd = data.state;
this.idEd = data.id;
this.show('edit');
}
edi(id:any){
  let i = {
    "practiceId": id,
    "title": this.titleEd,
    "meetingLink": this.linkEd,
    "note": this.notesEd,
    "time": this.dateEd  ,
    "state": this.statusEd
  }
  
  this.serv.upd(i).subscribe((d:ResponseHeader)=>{
    console.log(d);
    this.get(localStorage.getItem("camp"));
    this.show('edit')
  })
}
  isShow: boolean  = false;
  date: any = '';  // Initialize as empty string
  link: any = '';  // Initialize as empty string
  title: any = ''; // Initialize as empty string
  notes: any = '';
  constructor(private serv:PracticeService){
    if(localStorage.getItem("camp")){
      this.get(localStorage.getItem("camp"));
    }
    else{
      this.stand = null;
    }
    this.date = '';  // Initialize as empty string
        this.link = '';  // Initialize as empty string
        this.title = ''; // Initialize as empty string
        this.notes = '';
  }
  stand: any;

  get(id:any){
    if(id != null){
      this.serv.getData(id).subscribe((d:ResponseHeader)=>{
        this.stand = d.data;
        console.log(this.stand)
      })
    }
  }
  show(id:string){
    document.getElementById(id)?.classList.toggle("hidden");
    
  }
  handleClick(event: Event) {
    event.stopPropagation();  
    
  }
  stat:number = 1
  status(){
    if(this.stat == 1){
      this.stat++ ;
    }
    else{
      this.stat--;
    }
  }
  statEd(){
    if(this.statusEd == 1){
      this.statusEd++ ;
    }
    else{
      this.statusEd--;
    }
  }
  error:boolean = false; 
  err:any[]=[];
  success:boolean = false;
  create(date:any , state:any, link:any , notes:any, title:any){
    const data = {
      "title": this.title,
      "meetingLink": this.link,
      "note": this.notes,
      "time": this.date,
      "campId": localStorage.getItem("camp")
    }
   console.log(data); 
    this.err = [];
    this.success = false;
    if(this.date == ''){
      this.err.push(`enter a valid Date`);
      this.error = true
    }
    else{
      this.serv.addPractice(data).subscribe((d:ResponseHeader)=>{
      
        if(!d.isSuccess){
         this.error = true
         for (const field in d.errors) {
           if (d.errors.hasOwnProperty(field)) {
             this.err.push(`${field}: ${d.errors[field].join(', ')}`);
           }
         }
       }
       else{
        
        this.date = '';  // Initialize as empty string
        this.link = '';  // Initialize as empty string
        this.title = ''; // Initialize as empty string
        this.notes = '';
         this.error = false;
         this.success = true;
       }
     })
    }
   
  }
  copyToClipboard(value: string) {
    // Create a temporary textarea element to use the Clipboard API
    const textarea = document.createElement('textarea');
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    if (!navigator.clipboard){
      document.execCommand('copy');
      alert('Text copied to clipboard!');
  } else{
      navigator.clipboard.writeText(value).then(
          function(){
              alert("copied"); // success 
          })
        .catch(
           function() {
              alert("not copied"); // error
        });
  } 
    
    document.body.removeChild(textarea);

    // Optionally, you can show a success message or alert
    
  }
}
