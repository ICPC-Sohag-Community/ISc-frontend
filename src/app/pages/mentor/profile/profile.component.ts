import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ResponseHeader } from '../../../shared/model/responseHeader';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
constructor(private serv : ProfileService){

this.mentor();
this.img = localStorage.getItem('CURRENT_USER');
this.img = JSON.parse(this.img);
this.img = this.img.photoUrl
console.log(this.men)
}
img:any;

men:any;

mentor(){
  this.serv.mentor().subscribe((d:ResponseHeader)=>{
    this.men = d.data;
    console.log(d);
  })

}
}
