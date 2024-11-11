import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { SheetsHOCService } from '../../services/sheets-hoc.service';
import { CasheService } from '../../../../shared/services/cashe.service';

@Component({
  selector: 'app-actions-sheets',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule, NgClass, RouterLink],
  templateUrl: './actions-sheets.component.html',
  styleUrl: './actions-sheets.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ActionsSheetsComponent implements OnInit {
  sheetsHOCService = inject(SheetsHOCService);
  casheService = inject(CasheService);
  fb = inject(FormBuilder);
  elementRef = inject(ElementRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  @ViewChild('community') community!: NgSelectComponent;
  @ViewChild('status') status!: NgSelectComponent;
  @ViewChild('judge') judge!: NgSelectComponent;
  dropdownOpen: boolean = false;
  dropdownOpenS: boolean = false;
  foucsJ: boolean = false;
  sheetForm!: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  errorMessages: any = [];
  errorMessage: string = '';
  successMessage: string = '';

  id: number = 0;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });
    if (this.id > 0) {
      this.getOneSheet(this.id);
    }
    this.sheetForm = this.fb.group({
      id: [''],
      name: [null, [Validators.required]],
      sheetLink: [null, [Validators.required]],
      community: [null, [Validators.required]],
      onlineId: [null, [Validators.required]],
      status: [null, [Validators.required]],
      judgeType: [null, [Validators.required]],
      minimumPassingPrecent: [null, [Validators.required]],
      problemCount: [0, [Validators.required]],
      endDate: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
    });
  }

  getOneSheet(id: number): void {
    this.isLoading = true;
    this.sheetsHOCService.getOneSheet(id).subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode == 200) {
          this.isLoading = false;
          this.sheetForm.patchValue({
            id: data.id,
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            sheetLink: data.sheetLink,
            community: data.community,
            judgeType: data.community,
            onlineId: data.onlineId,
            status: data.status,
            minimumPassingPrecent: data.minimumPassingPrecent,
            problemCount: data.problemCount,
          });
        } else {
          this.isLoading = false;
        }
      },
    });
  }

  actionsSheet(): void {
    this.submitted = true;
    if (this.sheetForm.invalid) {
      console.log('error');
      return;
    }
    this.isLoading = true;
    if (this.id === 0) {
      this.sheetsHOCService.createSheet(this.sheetForm.value).subscribe({
        next: ({ statusCode, message, errors }) => {
          if (statusCode === 200) {
            this.errorMessage = '';
            this.successMessage = message;
            this.isLoading = false;
            this.casheService.clearCache();
            setTimeout(() => {
              this.errorMessage = '';
              this.successMessage = '';
            }, 3000);
            this.router.navigate(['/head_of_camp/sheets']);
          } else if (statusCode === 400) {
            this.successMessage = '';
            this.errorMessage = message;
            this.isLoading = false;
            setTimeout(() => {
              this.errorMessage = '';
              this.successMessage = '';
            }, 3000);
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
      this.sheetsHOCService.updateSheet(this.sheetForm.value).subscribe({
        next: ({ statusCode, message, errors }) => {
          if (statusCode === 200) {
            this.errorMessage = '';
            this.successMessage = message;
            this.isLoading = false;
            this.casheService.clearCache();
            this.router.navigate(['/head_of_camp/sheets']);
            setTimeout(() => {
              this.errorMessage = '';
              this.successMessage = '';
            }, 3000);
          } else if (statusCode === 400) {
            this.successMessage = '';
            this.errorMessage = message;
            this.isLoading = false;
            setTimeout(() => {
              this.errorMessage = '';
              this.successMessage = '';
            }, 3000);
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
    Object.keys(this.sheetForm.controls).forEach((field) => {
      const control = this.sheetForm.get(field);
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

  @HostListener('document:click', ['$event'])
  onClickOutside() {
    if (this.community.dropdownPanel === undefined) {
      this.dropdownOpen = false;
      this.dropdownOpenS = false;
      this.foucsJ = false;
    }
  }

  toggleDropdown() {
    if (this.dropdownOpen) {
      this.community.close();
    } else {
      this.community.open();
    }
    this.dropdownOpen = !this.dropdownOpen;
  }
  toggleDropdownS() {
    debugger;
    if (this.dropdownOpenS) {
      this.status.close();
    } else {
      this.status.open();
    }
    this.dropdownOpenS = !this.dropdownOpenS;
  }
  toggleDropdownJ() {
    if (this.foucsJ) {
      this.judge.close();
    } else {
      this.judge.open();
    }
    this.foucsJ = !this.foucsJ;
  }

  increase() {
    this.sheetForm
      .get('problemCount')
      ?.setValue(this.sheetForm.get('problemCount')?.value + 1);
  }

  decrease() {
    const current = this.sheetForm.get('problemCount')?.value;
    if (current > 0) {
      this.sheetForm.get('problemCount')?.setValue(current - 1);
    }
  }
}
