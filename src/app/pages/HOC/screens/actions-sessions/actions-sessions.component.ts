import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SessionsHOCService } from '../../services/sessions-hoc.service';
import { CasheService } from '../../../../shared/services/cashe.service';

@Component({
  selector: 'app-actions-sessions',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './actions-sessions.component.html',
  styleUrl: './actions-sessions.component.scss',
})
export class ActionsSessionsComponent implements OnInit {
  sessionsHOCService = inject(SessionsHOCService);
  casheService = inject(CasheService);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  id: number = 0;
  submitted: boolean = false;
  isLoading: boolean = false;
  sessionForm!: FormGroup;
  errorMessages: any = [];
  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });
    if (this.id > 0) {
      this.getOneSession(this.id);
    }
    this.sessionForm = this.fb.group({
      id: [''],
      instructorName: [null, [Validators.required]],
      topic: [null, [Validators.required]],
      locationName: [null, [Validators.required]],
      locationLink: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
    });
  }

  getOneSession(id: number): void {
    this.isLoading = true;
    this.sessionsHOCService.getOneSession(id).subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode == 200) {
          this.isLoading = false;
          this.sessionForm.patchValue({
            id: data.id,
            instructorName: data.instructorName,
            topic: data.topic,
            startDate: data.startDate,
            endDate: data.endDate,
            locationLink: data.locationLink,
            locationName: data.locationName,
          });
        } else {
          this.isLoading = false;
        }
      },
    });
  }

  actionsSession(): void {
    this.submitted = true;
    if (this.sessionForm.invalid) {
      console.log('error');
      return;
    }
    this.isLoading = true;
    if (this.id === 0) {
      this.sessionsHOCService.createSession(this.sessionForm.value).subscribe({
        next: ({ statusCode, message, errors }) => {
          if (statusCode === 200) {
            this.errorMessage = '';
            this.successMessage = message;
            this.casheService.clearCache();
            this.router.navigate(['/head_of_camp/sessions']);
            this.isLoading = false;
          } else if (statusCode === 400) {
            this.successMessage = '';
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
    } else {
      this.sessionsHOCService.updateSession(this.sessionForm.value).subscribe({
        next: ({ statusCode, message, errors }) => {
          if (statusCode === 200) {
            this.errorMessage = '';
            this.successMessage = message;
            this.casheService.clearCache();
            this.router.navigate(['/head_of_camp/sessions']);
            this.isLoading = false;
          } else if (statusCode === 400) {
            this.successMessage = '';
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
  }

  removeErrorM() {
    this.errorMessage = '';
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

    Object.keys(this.sessionForm.controls).forEach((field) => {
      const control = this.sessionForm.get(field);

      if (control?.invalid) {
        if (control.errors?.['required']) {
          this.errorMessages.push(`${field} is required`);
        }
      }
    });
    this.errorMessages.forEach((error: any, index: number) => {
      setTimeout(() => {
        this.removeError(index);
      }, 3000);
    });
  }
}
