import { NgClass } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { LeaderProfileService } from '../../services/leader-profile.service';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule, NgClass],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileDetailsComponent implements OnInit {
  leaderProfileService = inject(LeaderProfileService);
  fb = inject(FormBuilder);
  isEditMode = false;
  profileForm!: FormGroup;
  isLoading: boolean = false;
  allCollege: { id: number; name: string }[] = [];
  foucsTerm: boolean = false;
  foucsCollege: boolean = false;
  errorMessages: any = [];
  errorMessage: string = '';
  successMessage: string = '';
  phoneMessage: string = '';
  isMessageSuccess: boolean = false;
  isMessageSuccessId: boolean = false;
  idMessage: string = '';
  @ViewChild('term') term!: NgSelectComponent;
  @ViewChild('college') college!: NgSelectComponent;

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      nationalId: [
        '',
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.minLength(14),
        ],
      ],
      grade: [null, [Validators.required]],
      college: [null, [Validators.required]],
      facebook: [''],
      birthDate: ['', [Validators.required]],
    });
    this.profileForm.disable();

    this.getGeneralProfile();
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

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
      this.phoneMessage = '';
      this.idMessage = '';
      this.getGeneralProfile();
    }
  }

  vaildationPhone(): void {
    let phoneNumber = this.profileForm.get('phoneNumber')?.value.length;
    if (phoneNumber > 10) {
      this.leaderProfileService.validatePhoneNumber(phoneNumber).subscribe({
        next: ({ statusCode, message }) => {
          if (statusCode === 200) {
            this.isMessageSuccess = true;
            this.phoneMessage = message;
          } else {
            this.isMessageSuccess = false;
            this.phoneMessage = message;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.phoneMessage = '';
    }
  }
  vaildationId(): void {
    let nationalId = this.profileForm.get('nationalId')?.value.length;
    if (nationalId > 13) {
      this.leaderProfileService.validateNationalId(nationalId).subscribe({
        next: ({ statusCode, message }) => {
          if (statusCode === 200) {
            this.isMessageSuccessId = true;
            this.idMessage = message;
          } else {
            this.isMessageSuccessId = false;
            this.idMessage = message;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.idMessage = '';
    }
  }

  onSubmit() {
    this.isLoading = true;
    if (
      this.profileForm.invalid ||
      !this.isMessageSuccess ||
      !this.isMessageSuccessId
    ) {
      this.isLoading = false;
      this.displayFormErrors();

      return;
    }
    this.leaderProfileService
      .updateLeaderProfile(this.profileForm.value)
      .subscribe({
        next: ({ statusCode, message, errors }) => {
          if (statusCode === 200) {
            this.isLoading = false;
            this.successMessage = message;
            this.isEditMode = false;
          } else if (statusCode === 400) {
            this.errorMessage = message;
            this.isLoading = false;
          } else {
            this.handleApiErrors(errors);
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }

  removeErrorM() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  handleApiErrors(errors: any) {
    this.errorMessages = [];
    if (errors) {
      this.errorMessages = errors;
    } else {
      this.errorMessages.push(
        'An unknown error occurred. Please try again later.'
      );
    }
    this.errorMessages.forEach((error: any, index: number) => {
      setTimeout(() => {
        this.removeError(index);
      }, 3000);
    });
  }

  removeError(index: number) {
    this.errorMessages.splice(index, 1);
  }

  displayFormErrors() {
    this.errorMessages = [];
    Object.keys(this.profileForm.controls).forEach((field) => {
      const control = this.profileForm.get(field);
      if (control?.invalid) {
        if (control.errors?.['required']) {
          this.errorMessages.push(`${field} is required`);
        }
        if (control.errors?.['minlength']) {
          this.errorMessages.push(
            `${field} must be at least ${control.errors['minlength'].requiredLength} numbers long`
          );
        }
        if (control.errors?.['maxlength']) {
          this.errorMessages.push(
            `${field} must be ${control.errors['maxlength'].requiredLength} numbers long`
          );
        }
      }
    });
    this.errorMessages.forEach((error: any, index: number) => {
      setTimeout(() => {
        this.removeError(index);
      }, 3000);
    });
  }

  getGeneralProfile(): void {
    this.isLoading = true;
    this.leaderProfileService.generalLeaderProfile().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode == 200) {
          this.isLoading = false;
          this.profileForm.patchValue({
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            nationalId: data.nationalId,
            facebook: data.facebook,
            college: data.college,
            grade: data.grade,
            birthDate: data.birthDate,
          });
        } else {
          this.isLoading = false;
        }
      },
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.term.dropdownPanel === undefined) {
      this.foucsTerm = false;
    }
    if (this.college.dropdownPanel === undefined) {
      this.foucsCollege = false;
    }
  }

  toggleDropdownTerm() {
    if (this.foucsTerm) {
      this.term.close();
    } else {
      this.term.open();
    }
    this.foucsTerm = !this.foucsTerm;
  }
  toggleDropdownCollege() {
    if (this.foucsCollege) {
      this.college.close();
    } else {
      this.college.open();
    }
    this.foucsCollege = !this.foucsCollege;
  }
}
