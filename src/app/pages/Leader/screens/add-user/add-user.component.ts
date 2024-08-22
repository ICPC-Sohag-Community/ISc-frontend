import {
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DashboardService } from '../../services/dashboard.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule, NgClass],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  dashboardService = inject(DashboardService);
  fb = inject(FormBuilder);
  allRoles: { id: number; name: string }[] = [];
  allCollega: { id: number; name: string }[] = [];
  allCamps: { id: number; name: string }[] = [];
  error: any = [];
  selectedRole: string = '';
  selectedCamp: string = '';
  selectedCollega: string = '';
  uploadedFileName: string = '';
  isShow: boolean = false;
  foucsCollega: boolean = false;
  foucsRole: boolean = false;
  submitted: boolean = false;
  isLoading: boolean = false;
  imgFile!: File;
  addUserForm!: FormGroup;
  @ViewChild('formControl') formControls!: QueryList<ElementRef>;
  @ViewChild(FormGroupDirective) formDir!: FormGroupDirective;

  ngOnInit(): void {
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
      vjudgeHandle: [''],
      campId: [''],
      role: [null, [Validators.required]],
    });
    this.fetchAllRoles();
    this.fetchAllCamps();
    this.allCollega = [
      { id: 0, name: 'Computer and Ai' },
      { id: 1, name: 'EELU' },
      { id: 2, name: 'Science' },
      { id: 3, name: 'Engineering' },
      { id: 4, name: 'Commerce' },
      { id: 5, name: 'Law' },
      { id: 6, name: 'Others' },
    ];
  }

  focusInvalidControl() {
    if (this.formControls) {
      const invalidControls = this.formControls
        .toArray()
        .filter(
          (control) =>
            control.nativeElement &&
            control.nativeElement.classList.contains('ng-invalid')
        );
      console.log(invalidControls);
      if (invalidControls.length > 0) {
        const firstInvalidControl = invalidControls[0].nativeElement;
        firstInvalidControl.focus();
        firstInvalidControl.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }

  craeteUser() {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      this.focusInvalidControl();
      return;
    }
    this.isLoading = true;

    const formdata = new FormData();
    formdata.append('FirstName', this.addUserForm.value.firstName);
    formdata.append('MiddleName', this.addUserForm.value.middleName);
    formdata.append('LastName', this.addUserForm.value.lastName);
    formdata.append('Email', this.addUserForm.value.email); ///
    formdata.append('NationalId', this.addUserForm.value.nationalId); //
    formdata.append('BirthDate', this.addUserForm.value.birthDate);
    formdata.append('PhoneNumber', this.addUserForm.value.phoneNumber);
    formdata.append('College', this.addUserForm.value.college);
    formdata.append('CodeForceHandle', this.addUserForm.value.codeForceHandle); ///
    formdata.append('Grade', this.addUserForm.value.grade);
    formdata.append('Gender', this.addUserForm.value.gender);
    formdata.append('ProfileImage', this.imgFile);
    if (this.addUserForm.value.vjudgeHandle !== null) {
      formdata.append('VjudgeHandle', this.addUserForm.value.vjudgeHandle); ///
    }
    formdata.append('CampId', this.addUserForm.value.campId);
    formdata.append('Role', this.addUserForm.value.role);

    console.log(this.addUserForm.value);

    this.dashboardService.createAccount(formdata).subscribe({
      next: ({ statusCode, message, errors }) => {
        if (statusCode === 200) {
          debugger;
          alert('done');
          this.formDir.resetForm();
          this.isLoading = false;
        } else if (errors) {
          this.error = errors;
          this.isLoading = false;

          console.log(errors);
          alert(errors);
        } else {
          alert(message);
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  onFileSelected(event: any): void {
    this.imgFile = event.target.files[0];
    console.log(this.imgFile);
    this.uploadedFileName = this.imgFile.name;
  }

  getRole(role: any): void {
    this.selectedRole = role.name;
    if (
      this.selectedRole === 'Trainee' ||
      this.selectedRole === 'Head_Of_Camp'
    ) {
      this.isShow = true;
    } else {
      this.isShow = false;
      this.selectedCamp = '';
      this.addUserForm.get('campId')?.setValue('');
    }
  }

  showCampsWhenFocus(): void {
    if (
      this.selectedRole === 'Trainee' ||
      this.selectedRole === 'Head_Of_Camp'
    ) {
      this.isShow = true;
    } else {
      this.isShow = false;

      this.addUserForm.get('campId')?.setValue(null);
    }
    this.foucsRole = true;
  }
  hideCampsWhenblur(event: any): void {
    let isTrusted = event.isTrusted;
    if (!this.selectedCamp) {
      isTrusted = false;
    } else if (this.selectedCamp === this.selectedCamp) {
      this.isShow = true;
      isTrusted = true;
    } else {
      this.isShow = false;
      isTrusted = false;
    }
    this.foucsRole = false;
  }

  handleSelectCollega(item: any) {
    this.selectedCollega = item.id;
    if (item.id) {
      this.foucsCollega = false;
    }
  }

  handleOpen() {
    this.foucsCollega = false;
  }

  handleClose(): void {
    this.foucsCollega = true;
  }

  getCampId(camp: any): void {
    this.selectedCamp = camp.name;
    this.addUserForm.get('campId')?.setValue(camp.id);
    this.isShow = false;
  }

  fetchAllRoles(): void {
    // this.isLoading.set(true);
    this.dashboardService.roles().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.allRoles = data;
          // this.isLoading.update((v) => (v = false));
        } else {
          // this.isLoading.update((v) => (v = false));
        }
      },
      error: (err) => {
        console.log(err);
        // this.isLoading.update((v) => (v = false));
      },
    });
  }
  fetchAllCamps(): void {
    // this.isLoading.set(true);
    this.dashboardService.getAllCamps().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.allCamps = data;
          // this.isLoading.update((v) => (v = false));
        } else {
          // this.isLoading.update((v) => (v = false));
        }
      },
      error: (err) => {
        console.log(err);
        // this.isLoading.update((v) => (v = false));
      },
    });
  }
}
