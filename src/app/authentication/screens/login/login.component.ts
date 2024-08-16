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
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  loginForm!: FormGroup;
  submitted = false;
  error: string = '';
  isLoading: boolean = false;

  passwordFieldType: string = 'password';
  password: string = '';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [true, [Validators.required]],
    });
  }

  // togglePasswordVisibility(): void {
  //   this.passwordFieldType =
  //     this.passwordFieldType === 'password' ? 'text' : 'password';
  // }

  onLogin() {
    this.submitted = true;
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      alert('تأكد من إدخال البيانات');
      return;
    }
    this.isLoading = true;
    debugger;
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
