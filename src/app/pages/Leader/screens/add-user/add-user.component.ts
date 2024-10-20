import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { DashboardService } from '../../services/dashboard.service';
import { NgClass } from '@angular/common';
import { CasheService } from '../../../../shared/services/cashe.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule, NgClass],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  dashboardService = inject(DashboardService);
  casheService = inject(CasheService);
  fb = inject(FormBuilder);
  allRoles: { id: number; name: string }[] = [];
  allCollege: { id: number; name: string }[] = [];
  allCamps: { id: number; name: string }[] = [];
  error: any = [];
  selectedRole: string = '';
  selectedCamp: string = '';
  selectedCollege: string = '';
  uploadedFileName: string = '';
  isShow: boolean = false;
  foucsCollege: boolean = false;
  foucsRole: boolean = false;
  submitted: boolean = false;
  isLoading: boolean = false;
  imgFile!: File;
  addUserForm!: FormGroup;
  @ViewChild('formControl') formControls!: QueryList<ElementRef>;
  @ViewChild(FormGroupDirective) formDir!: FormGroupDirective;
  @ViewChild('collegeSelect') collegeSelect!: NgSelectComponent;
  @ViewChild('roleSelect') roleSelect!: NgSelectComponent;

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
    this.allCollege = [
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
    formdata.append('CodeForceHandle', this.addUserForm.value.codeForceHandle);
    formdata.append('Grade', this.addUserForm.value.grade);
    formdata.append('Gender', this.addUserForm.value.gender);
    if (this.addUserForm.value.vjudgeHandle !== null) {
      formdata.append('VjudgeHandle', this.addUserForm.value.vjudgeHandle); ///
    }
    if (
      this.addUserForm.value.ProfileImage !== null ||
      this.addUserForm.value.ProfileImage !== undefined
    ) {
      formdata.append('ProfileImage', this.imgFile);
    }
    formdata.append('CampId', this.addUserForm.value.campId);
    formdata.append('Role', this.addUserForm.value.role);

    this.dashboardService.createAccount(formdata).subscribe({
      next: ({ statusCode, message, errors }) => {
        if (statusCode === 200) {
          alert('done');
          this.casheService.clearCache();
          this.selectedCamp = '';
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

  handleSelectCollege(item: any) {
    this.selectedCollege = item.id;
    if (item.id) {
      this.foucsCollege = false;
    }
  }

  getCampId(camp: any): void {
    this.selectedCamp = camp.name;
    this.addUserForm.get('campId')?.setValue(camp.id);
    this.isShow = false;
  }

  fetchAllRoles(): void {
    this.dashboardService.roles().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.allRoles = data;
        } else {
          console.log('error');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  fetchAllCamps(): void {
    this.dashboardService.getAllCamps().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.allCamps = data;
        } else {
          console.log('error');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleDropdownC(collegeSelect: NgSelectComponent) {
    if (this.foucsCollege) {
      collegeSelect.close();
    } else {
      collegeSelect.open();
    }
    this.foucsCollege = !this.foucsCollege;
  }
  toggleDropdownR(roleSelect: NgSelectComponent) {
    if (this.foucsRole) {
      roleSelect.close();
    } else {
      roleSelect.open();
    }
    this.foucsRole = !this.foucsRole;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.collegeSelect.dropdownPanel === undefined) {
      this.foucsCollege = false;
    }
    if (this.roleSelect.dropdownPanel === undefined) {
      this.foucsRole = false;
    }
  }
}
