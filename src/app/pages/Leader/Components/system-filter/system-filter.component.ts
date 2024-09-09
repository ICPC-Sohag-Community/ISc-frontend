import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

export type Form = FormGroup<{
  filters: FormArray<FormFilter>;
}>;
export type FormFilter = FormGroup<{
  sheetId: FormControl;
  community: FormControl;
  passingPrecent: FormControl;
}>;

@Component({
  selector: 'app-system-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './system-filter.component.html',
  styleUrl: './system-filter.component.scss',
})
export class SystemFilterComponent implements OnInit {
  @Input() filterValues: any;
  @Output() saveFilter = new EventEmitter<Form>();
  @Output() clickOutside = new EventEmitter<void>();
  elementRef = inject(ElementRef);
  fb = inject(NonNullableFormBuilder);
  filterForm!: Form;

  ngOnInit() {
    this.filterForm = this.fb.group({
      filters: this.fb.array<FormFilter>([this.generateFilter()]),
    }) as Form;
    debugger;
    console.log(this.filterValues);
    if (this.filterValues) {
      this.setSavedFilters(this.filterValues);
    }
  }

  generateFilter(): FormFilter {
    return this.fb.group({
      sheetId: ['', [Validators.required]],
      community: [null, [Validators.required]],
      passingPrecent: [null, [Validators.required]],
    }) as FormFilter;
  }

  get filters(): FormArray<FormFilter> {
    return this.filterForm.get('filters') as FormArray<FormFilter>;
  }
  addFilter() {
    if (this.filterForm.valid) {
      this.filters.push(this.generateFilter());
    }
  }

  removeFilter(index: number) {
    this.filters.removeAt(index);
  }

  saveCustomFilter(): void {
    this.filters.controls.forEach((control) => {
      const selectValue = Number(control.get('community')?.value);
      const textBoxValue = Number(control.get('passingPrecent')?.value);

      control.patchValue({
        community: selectValue,
        passingPrecent: textBoxValue,
      });
    });
    debugger;

    if (this.filterForm.valid) {
      this.saveFilter.emit(this.filterForm);
    }
  }

  setSavedFilters(savedData: any[]) {
    this.filters.clear(); // Clear existing form array

    // Loop through each item in the saved data array
    savedData.forEach((filterData) => {
      const newFilter = this.generateFilter(); // Generate a new form group for each filter

      // Use patchValue to apply the values
      newFilter.patchValue({
        sheetId: filterData.sheetId,
        community: filterData.community,
        passingPrecent: filterData.passingPrecent,
      });

      // Push the new filter to the form array
      this.filters.push(newFilter);
    });
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
