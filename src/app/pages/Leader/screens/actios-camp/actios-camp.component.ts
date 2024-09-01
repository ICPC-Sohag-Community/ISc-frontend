import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-actios-camp',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule, NgClass],
  templateUrl: './actios-camp.component.html',
  styleUrl: './actios-camp.component.scss',
})
export class ActiosCampComponent implements OnInit {
  dashboardService = inject(DashboardService);
  fb = inject(FormBuilder);
  allRoles: { id: number; name: string }[] = [];
  allCollega: { id: number; name: string }[] = [];
  allCamps: { id: number; name: string }[] = [];
  error: any = [];
  selectedRole: string = '';
  selectedCamp: string = '';
  uploadedFileName: string = '';
  isShow: boolean = false;
  foucsCollega: boolean = false;
  foucsRole: boolean = false;
  submitted: boolean = false;
  isLoading: boolean = false;
  imgFile!: File;
  addUserForm!: FormGroup;
  route = inject(ActivatedRoute);
  id: number = 0;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
      // if (this.userId > 0) {
      //   this.fetchUser({
      //     userId: this.userId,
      //   });
      // }
    });
    this.addUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nationalId: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      college: [null, [Validators.required]],
      grade: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      profileImage: [null],
      codeForceHandle: ['', [Validators.required]],
      vjudgeHandle: [null],
      campId: [''],
      role: [null, [Validators.required]],
    });
  }

  craeteUser() {
    // this.submitted = true;
    // if (this.addUserForm.invalid) {
    //   console.log(this.addUserForm.errors);
    //   console.log('error');
    //   return;
    // }
    // this.isLoading = true;

    console.log(this.addUserForm.value);

    // this.dashboardService.createAccount(formdata).subscribe({
    //   next: ({ statusCode, message, errors }) => {
    //     if (statusCode === 200) {
    //       // this.toastr.success(msg);
    //       alert('done');
    //       this.addUserForm.reset();
    //       this.isLoading = false;
    //       // this.router.navigateByUrl('/admin/tutorial');
    //     } else if (errors) {
    //       this.error = errors;
    //       console.log(errors);
    //       alert(errors);
    //     } else {
    //       alert(message);
    //       // this.toastr.error(msg);

    //       this.isLoading = false;
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.isLoading = false;
    //   },
    // });
  }
}
