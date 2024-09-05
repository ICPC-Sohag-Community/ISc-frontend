import { Component } from '@angular/core';
import { ForgetService } from '../services/forget.service';
import { FormGroup, FormControl, Validators,FormsModule } from '@angular/forms';
import { HttpHeaderResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ResponseHeader } from '../../../shared/model/responseHeader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {
  constructor(private serv : ForgetService,private router: Router ){

  }
  found = false;
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
find(email: any) {
  console.log(email.value)
this.serv.otp(email.value).subscribe((d:ResponseHeader)=>{
  console.log(d);
  if(d.isSuccess){
    this.router.navigate(['/otp' , email.value])
  }
  else{
    
    this.found = true;
  }
});
}

}
