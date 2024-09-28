import { CommonModule, NgOptimizedImage, SlicePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgSelectModule,NgSelectComponent } from '@ng-select/ng-select';
import { FormService } from '../../../Services/form.service';
import { Camp } from '../../../model/camp';

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


  constructor(private _form:FormService){}



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
  selectedDate: number | null | any = null;
  fileName: string = '';
  allCamps:Camp[]=[]


  genderTerm: boolean = false;
  collageTerm: boolean = false;
  gradeTerm: boolean = false;
  campTerm: boolean = false;
  lapTerm: boolean = false;

  registerForm:FormGroup= new FormGroup({
    FirstName:new FormControl(null,[Validators.required]),
    MiddleName:new FormControl(null,[Validators.required]),
    LastName:new FormControl(null,[Validators.required]),
    NationalId:new FormControl(null,[Validators.required,Validators.maxLength(14),Validators.minLength(14)]),
    BirthDate:new FormControl(null,[Validators.required]),
    Grade:new FormControl(null,[Validators.required]),
    College:new FormControl(null,[Validators.required]),
    Gender:new FormControl(null,[Validators.required]),
    CodeForceHandle:new FormControl(null,[Validators.required]),
    FacebookLink:new FormControl(null),
    VjudgeHandle:new FormControl(null),
    Email:new FormControl(null,[Validators.required,Validators.email]),
    PhoneNumber:new FormControl(null,[Validators.required,Validators.maxLength(11),Validators.minLength(11)]),
    Photo:new FormControl(null),
    Comment:new FormControl(null),
    HasLaptop:new FormControl(null,[Validators.required]),
    otp:new FormControl(null,[Validators.required]),
    CampId:new FormControl(null,[Validators.required]),
  })

  ngOnInit(): void {
    this.renderCalendar(this.currentDate, 'start');
    this.dateStart = new Date();
    this.selectedDay = this.dateStart.getDate();
    this.fechAllCamps()
  }

  fechAllCamps():void{
    this._form.getCamps().subscribe({
      next:({statusCode,data})=>{
        if(statusCode===200){
          this.allCamps=data;
        }
      }
    })
  }

  onSubmit() {
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      const formData = new FormData();

      // Loop through all the form controls and append them to the FormData object
      Object.keys(this.registerForm.controls).forEach((key) => {
      const value = this.registerForm.get(key)?.value;

      // Check if the field is a file input, handle it separately
      if (key === 'Photo' && value) {
        formData.append(key, value); // Assuming `value` is a File object
      } else {
        formData.append(key, value);
      }
    });

      this._form.applyForm(formData).subscribe({
        next:({statusCode,data})=>{
          if(statusCode===200){
            console.log();

          }
        }
      })
    } else {
      console.log('Form is invalid');
    }
  }

  sendOTP():void{
    // console.log(typeof JSON.parse(this.registerForm.get('Email')?.value));

    if(this.registerForm.get('Email')?.valid)
    {
      this._form.sendOtp(this.registerForm.get('Email')?.value).subscribe({
        next:({statusCode,data})=>{
          if (statusCode===200) {

          }
        }
      })
    }
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
      this.registerForm.get('BirthDate')?.setValue(formattedDate);
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
    if (this.gradeTerm) {
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = this.formatFileName(file.name);
    }
  }
  formatFileName(name: string): string {
    const words = name.split(' ');
    if (words.length > 3) {
      return `${words.slice(0, 3).join(' ')} ...`;
    }
    return name;
  }
}
