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
import { ValidationProfileService } from '../../../../shared/services/validation-profile.service';
import { Router } from '@angular/router';

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
  validationProfileService = inject(ValidationProfileService);
  router = inject(Router);
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
  isMessageSuccess: boolean = true;
  isMessageSuccessId: boolean = true;
  idMessage: string = '';
  currentPath: string = '';
  camps: string[] = [];
  camp: string = '';
  @ViewChild('term') term!: NgSelectComponent;
  @ViewChild('college') college!: NgSelectComponent;

  ngOnInit(): void {
    this.currentPath = this.router.url;
    if (this.currentPath.includes('leader')) {
      this.getGeneralProfile();
    } else if (this.currentPath.includes('head_of_camp')) {
      this.generalHeadProfile();
    } else {
      this.generalMentorProfile();
    }
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
      facebookLink: [null],
      birthDate: ['', [Validators.required]],
    });

    this.profileForm.disable();
    this.allCollege = [
      { id: 0, name: 'Computer and Ai' },
      { id: 1, name: 'EELU' },
      { id: 2, name: 'Science' },
      { id: 3, name: 'Engineering' },
      { id: 4, name: 'Commerce' },
      { id: 5, name: 'Law' },
      { id: 6, name: 'Others' },
    ];
    this.addFieldsForHead();
  }

  addFieldsForHead() {
    if (
      this.currentPath.includes('head_of_camp') ||
      this.currentPath.includes('mentor')
    ) {
      if (!this.profileForm.get('about')) {
        this.profileForm.addControl('about', this.fb.control(''));
      }
    } else {
      if (this.profileForm.get('about')) {
        this.profileForm.removeControl('about');
      }
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
      this.phoneMessage = '';
      this.idMessage = '';
      if (this.currentPath.includes('leader')) {
        this.getGeneralProfile();
      } else if (this.currentPath.includes('head_of_camp')) {
        this.generalHeadProfile();
      } else {
        this.generalMentorProfile();
      }
    }
  }

  vaildationPhone(): void {
    let phoneNumber = this.profileForm.get('phoneNumber')?.value;
    if (phoneNumber.length > 10) {
      this.validationProfileService.validatePhoneNumber(phoneNumber).subscribe({
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
    let nationalId = this.profileForm.get('nationalId')?.value;
    if (nationalId.length > 13) {
      this.validationProfileService.validateNationalId(nationalId).subscribe({
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
    if (this.profileForm.get('facebookLink')?.value === '') {
      this.profileForm.get('facebookLink')?.setValue(null);
    }
    debugger;
    if (this.currentPath.includes('leader')) {
      this.updateLeaderProfile();
    } else if (this.currentPath.includes('head_of_camp')) {
      this.updateHeadOfCamp();
    } else {
      this.updateMentor();
    }
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
            facebookLink: data.facebookLink,
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
  generalHeadProfile(): void {
    this.isLoading = true;
    this.leaderProfileService.generalHeadProfile().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode == 200) {
          this.isLoading = false;
          this.camp = data.campName;
          this.profileForm.patchValue({
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            nationalId: data.nationalId,
            facebookLink: data.facebookLink,
            college: data.college,
            grade: data.grade,
            birthDate: data.birthDate,
            about: data.about,
          });
        } else {
          this.isLoading = false;
        }
      },
    });
  }

  generalMentorProfile(): void {
    this.isLoading = true;
    this.leaderProfileService.generalMentorProfile().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode == 200) {
          this.isLoading = false;
          this.camps = [...data.camps];
          console.log(this.camps);
          this.profileForm.patchValue({
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            nationalId: data.nationalId,
            facebookLink: data.facebookLink,
            college: data.college,
            grade: data.grade,
            birthDate: data.birthDate,
            about: data.about,
          });
        } else {
          this.isLoading = false;
        }
      },
    });
  }

  // update leader
  updateLeaderProfile() {
    this.leaderProfileService.updateProfile(this.profileForm.value).subscribe({
      next: ({ statusCode, message, errors }) => {
        if (statusCode === 200) {
          this.isLoading = false;
          this.errorMessage = '';
          this.successMessage = message;
          this.isEditMode = false;
          this.phoneMessage = '';
          this.idMessage = '';
        } else if (statusCode === 400) {
          this.successMessage = '';
          this.errorMessage = message;
          this.isLoading = false;
        } else {
          this.errorMessage = '';
          this.successMessage = '';
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

  // update HOC
  updateHeadOfCamp() {
    this.leaderProfileService
      .updateHeadOfCamp(this.profileForm.value)
      .subscribe({
        next: ({ statusCode, message, errors }) => {
          if (statusCode === 200) {
            this.isLoading = false;
            this.errorMessage = '';
            this.successMessage = message;
            this.isEditMode = false;
            this.phoneMessage = '';
            this.idMessage = '';
          } else if (statusCode === 400) {
            this.successMessage = '';
            this.errorMessage = message;
            this.isLoading = false;
          } else {
            this.errorMessage = '';
            this.successMessage = '';
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

  // update Mentor
  updateMentor() {
    this.leaderProfileService.updateMentor(this.profileForm.value).subscribe({
      next: ({ statusCode, message, errors }) => {
        if (statusCode === 200) {
          this.isLoading = false;
          this.errorMessage = '';
          this.successMessage = message;
          this.isEditMode = false;
          this.phoneMessage = '';
          this.idMessage = '';
        } else if (statusCode === 400) {
          this.successMessage = '';
          this.errorMessage = message;
          this.isLoading = false;
        } else {
          this.errorMessage = '';
          this.successMessage = '';
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
    this.errorMessages.forEach((index: number) => {
      setTimeout(() => {
        this.removeError(index);
      }, 3000);
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
