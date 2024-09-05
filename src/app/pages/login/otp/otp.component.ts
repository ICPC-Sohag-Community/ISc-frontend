import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OtpService } from '../services/otp.service';
import { ResponseHeader } from '../../../shared/model/responseHeader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {
  email: any;

  constructor(private route: ActivatedRoute, private serv :OtpService,private router: Router) {}
check = false;
  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
  }
  get(email:any , otp:any){
    this.serv.getData(email , otp).subscribe((d:ResponseHeader)=>{
      if(d.isSuccess){
        this.router.navigate(['/login/set', d.data , email  ])
      }
      else{
        this.check = true;
      }
    })
  }
}
