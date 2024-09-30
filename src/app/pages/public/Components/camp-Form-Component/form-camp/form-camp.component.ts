import { CommonModule, NgOptimizedImage, SlicePipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgSelectModule, NgSelectComponent } from '@ng-select/ng-select';
import { FormService } from '../../../Services/form.service';
import { Camp } from '../../../model/camp';

@Component({
  selector: 'app-form-camp',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterLink,
    SlicePipe
  ],
  templateUrl: './form-camp.component.html',
  styleUrls: ['./form-camp.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class FormCampComponent {

  // Constructor to inject the FormService
  constructor(private _form: FormService) {}

  // ViewChild references for DOM elements
  @ViewChild('calendar') calendar!: ElementRef;
  @ViewChild('collageSelect') collageSelect!: NgSelectComponent;
  @ViewChild('gradeSelect') gradeSelect!: NgSelectComponent;
  @ViewChild('genderSelect') genderSelect!: NgSelectComponent;
  @ViewChild('campSelect') campSelect!: NgSelectComponent;
  @ViewChild('lapSelect') lapSelect!: NgSelectComponent;


  // Date-related properties

  currentDate = new Date();
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  startDays: number[] = [];
  startMonthYear: string = '';
  endMonthYear: string = '';
  endDays: number[] = [];
  dateStart!: Date;
  dateEnd!: Date;

  // Dropdown state properties
  dropdownOpen: boolean = false;
  dropdownOpenH: boolean = false;
  selectedDay: number | null | any = null;
  selectedDayEnd: number | null | any = null;
  selectedDate: number | null | any = null;

  // File properties
  fileName: string = '';
  succssesMessage: string = '';
  errorMessage: string = '';
  allCamps: Camp[] = [];
  selectedFile: File | null = null;
  years: number[] = [];
  endYear: any;
  selectedYear: any;
  allYears: number[] = [];


  // Form terms state properties

  genderTerm: boolean = false;
  collageTerm: boolean = false;
  gradeTerm: boolean = false;
  campTerm: boolean = false;
  lapTerm: boolean = false;
  show: boolean = false;


  // Reactive form definition

  registerForm: FormGroup = new FormGroup({
    FirstName: new FormControl(null, [Validators.required]),
    MiddleName: new FormControl(null, [Validators.required]),
    LastName: new FormControl(null, [Validators.required]),

    NationalId: new FormControl(null, [Validators.required, Validators.maxLength(14), Validators.minLength(14)]),

    BirthDate: new FormControl(null, [Validators.required]),
    Grade: new FormControl(null, [Validators.required]),
    College: new FormControl(null, [Validators.required]),
    Gender: new FormControl(null, [Validators.required]),
    CodeForceHandle: new FormControl(null, [Validators.required]),
    FacebookLink: new FormControl(null),
    VjudgeHandle: new FormControl(null),
    Email: new FormControl(null, [Validators.required, Validators.email]),

    PhoneNumber: new FormControl(null, [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    Photo: new FormControl(null),
    Comment: new FormControl(null),
    HasLaptop: new FormControl(null, [Validators.required]),
    otp: new FormControl(null, [Validators.required]),
    CampId: new FormControl(null, [Validators.required]),
  });


  // Lifecycle hook for initialization

  ngOnInit(): void {
    this.renderCalendar(this.currentDate, 'start');
    this.dateStart = new Date();
    this.selectedDay = this.dateStart.getDate();
    // this.fetchAllCamps() // Uncomment to fetch all camps
  }


  }

  // Fetch all camps (currently commented out)
  // fetchAllCamps(): void {
  //   this._form.getCamps().subscribe({
  //     next: ({statusCode, data}) => {
  //       if (statusCode === 200) {
  //         this.allCamps = data;
  //       }
  //     }
  //   });
  // }

  // Form submission handler
  onSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();

      // Append form data to FormData object
      Object.keys(this.registerForm.controls).forEach((key) => {
        const value = this.registerForm.get(key)?.value;

        if (key === 'Photo' && value) {
          formData.append(key, value); // Assuming `value` is a File object
        } else {
          formData.append(key, value);
        }
      });

      // Submit form data through the FormService
      this._form.applyForm(formData).subscribe({

        next: ({statusCode, data, message}) => {

          if (statusCode === 200) {
            this.registerForm.reset(null);
            this.succssesMessage = message;
            this.show = !this.show;
          } else if (statusCode === 400) {
            this.errorMessage = message;
            this.show = !this.show;
          }
        }
      });
    }
  }

  // Send OTP for email verification  

  sendOTP(): void {
    if (this.registerForm.get('Email')?.valid) {
      this._form.sendOtp(this.registerForm.get('Email')?.value).subscribe({
        next: ({ statusCode, data }) => {
          if (statusCode === 200) {
          }
        },
      });
    }
  }

  toggleCalendar() {
    this.calendar.nativeElement.classList.toggle('hidden');
  }

  // Set available years for the dropdown
  setYears(endYears: any): void {
    let years = [];
    for (let i = 1950; i <= endYears; i++) {
      years.push(i);
    }
    this.allYears = years;
  }

  // Render the calendar for a specific date
  renderCalendar(date: Date, name: string = 'start') {
    const newDate = new Date(date);
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    // Calculate the first day of the month and the last date of the month
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    this.startDays = [];
    this.startMonthYear = newDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    this.endYear = newDate.toLocaleDateString('en-US', {
      year: 'numeric'
    });
    this.setYears(this.endYear);

    // Populate startDays with the dates of the month
    for (let i = 1; i <= lastDate; i++) {
      this.startDays.push(i);
    }
  }

  // Select a date from the calendar
  selectDate(day: number, name: string) {
    const year = this.selectedYear;
    const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(day).padStart(2, '0');

    const formattedDate = `${year}-${month}-${dayOfMonth}`;
    this.selectedDay = day;
    this.registerForm.get('BirthDate')?.setValue(formattedDate);
    this.calendar.nativeElement.classList.add('hidden');

  }

  // Select a year from the dropdown
  selectYear(event: any): void {
    event.value == null ? this.changeYear(2024) : this.changeYear(event.value);
  }

  // Change the selected year and re-render the calendar
  changeYear(yearChange: any) {
    this.selectedYear = yearChange;
    this.dateStart.setFullYear(yearChange);
  }
  
  // Change the month displayed in the calendar
  changeMonth(monthChange: number) {
    this.dateStart.setMonth(this.dateStart.getMonth() + monthChange);
    this.renderCalendar(this.dateStart, 'start');
  }

  // Toggle the gender dropdown
  toggleDropdownGender(genderSelect: NgSelectComponent) {
    if (this.genderTerm) {
      genderSelect.close();
    } else {
      genderSelect.open();
    }
    this.genderTerm = !this.genderTerm;
  }

  // Toggle the collage dropdown
  toggleDropdownC(collageSelect: NgSelectComponent) {
    if (this.collageTerm) {
      collageSelect.close();
    } else {
      collageSelect.open();
    }
    this.collageTerm = !this.collageTerm;
  }

  // Toggle the grade dropdown
  toggleDropdownG(gradeSelect: NgSelectComponent) {
    if (this.gradeTerm) {
      gradeSelect.close();
    } else {
      gradeSelect.open();
    }
    this.gradeTerm = !this.gradeTerm;
  }

  // Toggle the lap dropdown
  toggleDropdownL(lapSelect: NgSelectComponent) {
    if (this.lapTerm) {
      lapSelect.close();
    } else {
      lapSelect.open();
    }
    this.lapTerm = !this.lapTerm;
  }

  // Toggle the camp dropdown
  toggleDropdownCamp(campSelect: NgSelectComponent) {
    if (this.campTerm) {
      campSelect.close();
    } else {
      campSelect.open();
    }
    this.campTerm = !this.campTerm;
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = this.formatFileName(file.name);
    }
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.registerForm.patchValue({ Photo: this.selectedFile });
    }
 }
 formatFileName(name: string): string {
    const words = name.split(' ');
    if (words.length > 3) {
      return `${words.slice(0, 3).join(' ')} ...`;
    }
    return name;
 }

  // Remove selected file
  removeFile() {
    this.selectedFile = null;
    this.fileName = '';
    this.registerForm.get('Photo')?.setValue(null);
  }
}
