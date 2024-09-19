import { RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, NgClass, RouterLink,RouterOutlet],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent {
  authService = inject(AuthService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  loginForm!: FormGroup;
  submitted = false;
  error: string = '';
  isLoading: boolean = false;
  passwordFieldType: string = 'password';
  password: string = '';
  hide= false;
show(){
if(!this.hide){
  document.getElementById('pass')?.setAttribute('type' , 'text');
}
else{
  document.getElementById('pass')?.setAttribute('type' , 'password');
}
this.hide = !this.hide
}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [(<HTMLInputElement>document.getElementById('rememberMe')).checked?true:false, [Validators.required]], 
    });
  }

  // togglePasswordVisibility(): void {
  //   this.passwordFieldType =
  //     this.passwordFieldType === 'password' ? 'text' : 'password';
  // }

  onLogin() {
    this.submitted = true;
    this.loginForm.value.rememberMe = (<HTMLInputElement>document.getElementById('rememberMe')).checked?true:false;
    console.log(this.loginForm.value)
    this.isLoading = true;

    this.authService.loginUser(this.loginForm.value).subscribe({
      
      next: ({ statusCode, data, msg }) => {
        if (statusCode === 200) {
          if (data.roles[0] === 'Leader') {
            this.router.navigate(['/leader']);
          } else if (data.roles[0] === 'Mentor') {
            this.router.navigateByUrl('/mentor');
          } else if (data.roles[0] === 'Head_Of_Camp') {
            this.router.navigateByUrl('/head_of_camp');
          } else if (data.roles[0] === 'Trainee') {
            this.router.navigateByUrl('/trainee');
          } else {
            this.router.navigate(['/']);
          }
          this.isLoading = false;
          this.authService.setIsAuth(true);
        } else {
          this.isLoading = false;
          this.authService.setIsAuth(false);
        }
      },
      error: (err) => {
        this.error = err.error.msg;
        this.isLoading = false;
      },
    });
  }
}

