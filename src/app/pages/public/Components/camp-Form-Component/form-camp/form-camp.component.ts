import { CommonModule, NgOptimizedImage, SlicePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgSelectModule,NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-form-camp',
  standalone: true,
  imports: [NgOptimizedImage,CommonModule, ReactiveFormsModule,
    NgSelectModule,
    RouterLink,
    SlicePipe],
  templateUrl: './form-camp.component.html',
  styleUrl: './form-camp.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class FormCampComponent {

  @ViewChild('calendar') calendar!: ElementRef;
  @ViewChild('collageSelect') collageSelect!: NgSelectComponent;
  @ViewChild('gradeSelect') gradeSelect!: NgSelectComponent;
  @ViewChild('genderSelect') genderSelect!: NgSelectComponent;
  @ViewChild('campSelect') campSelect!: NgSelectComponent;
  @ViewChild('lapSelect') lapSelect!: NgSelectComponent;


  currentDate = new Date();
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  startDays: number[] = [];
  startMonthYear: string = '';
  endMonthYear: string = '';
  endDays: number[] = [];
  dateStart!: Date;
  dateEnd!: Date;
  dropdownOpen: boolean = false;
  dropdownOpenH: boolean = false;
  selectedDay: number | null | any = null;
  selectedDayEnd: number | null | any = null;

  genderTerm: boolean = false;
  collageTerm: boolean = false;
  gradeTerm: boolean = false;
  campTerm: boolean = false;
  lapTerm: boolean = false;



  ngOnInit(): void {
    this.renderCalendar(this.currentDate, 'start');
    this.dateStart = new Date();
    this.selectedDay = this.dateStart.getDate();
  }

  toggleCalendar() {
      this.calendar.nativeElement.classList.toggle('hidden');
  }
  renderCalendar(date: Date, name: string = 'start') {
    const newDate = new Date(date);
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

      this.startDays = [];
      this.startMonthYear = newDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
      for (let i = 1; i <= lastDate; i++) {
        this.startDays.push(i);
      }
  }
  selectDate(day: number, name: string) {
    const year = this.currentDate.getFullYear();
    const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(day).padStart(2, '0');

    const formattedDate = `${year}-${month}-${dayOfMonth}`;
      this.selectedDay = day;
      // this.campForm.get('startDate')?.setValue(formattedDate);
      this.calendar.nativeElement.classList.add('hidden');

  }
  changeMonth(monthChange: number) {
      this.dateStart.setMonth(this.dateStart.getMonth() + monthChange);
      this.renderCalendar(this.dateStart, 'start');

  }
  toggleDropdownGender(genderSelect: NgSelectComponent) {
    if (this.genderTerm) {
      genderSelect.close();
    } else {
      genderSelect.open();
    }
    this.genderTerm = !this.genderTerm;
  }
  toggleDropdownC(collageSelect: NgSelectComponent) {
    if (this.collageTerm) {
      collageSelect.close();
    } else {
      collageSelect.open();
    }
    this.collageTerm = !this.collageTerm;
  }
  toggleDropdownG(gradeSelect: NgSelectComponent) {
    if (this.collageTerm) {
      gradeSelect.close();
    } else {
      gradeSelect.open();
    }
    this.gradeTerm = !this.gradeTerm;
  }
  toggleDropdownL(lapSelect: NgSelectComponent) {
    if (this.lapTerm) {
      lapSelect.close();
    } else {
      lapSelect.open();
    }
    this.lapTerm = !this.lapTerm;
  }
  toggleDropdownCamp(campSelect: NgSelectComponent) {
    if (this.campTerm) {
      campSelect.close();
    } else {
      campSelect.open();
    }
    this.campTerm = !this.campTerm;
  }
}
