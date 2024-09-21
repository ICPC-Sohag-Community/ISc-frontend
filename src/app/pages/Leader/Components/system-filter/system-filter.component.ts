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
  ViewEncapsulation,
} from '@angular/core';
import {
  FormArray,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Form, FormFilter } from '../../model/requests';

@Component({
  selector: 'app-system-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './system-filter.component.html',
  styleUrl: './system-filter.component.scss',
  encapsulation: ViewEncapsulation.None,
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
    if (this.filterValues) {
      this.setSavedFilters(this.filterValues);
    }
    this.updateLastRowValidation();
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
    this.filters.push(this.generateFilter());
    this.updateLastRowValidation();
  }

  removeFilter(index: number) {
    this.filters.removeAt(index);
    this.updateLastRowValidation();
  }

  saveCustomFilter(): void {
    this.filters.controls.forEach((control) => {
      control.patchValue({
        community: Number(control.get('community')?.value),
        passingPrecent: Number(control.get('passingPrecent')?.value),
      });
    });
    if (this.filterForm.valid && this.filters.length > 1) {
      this.filters.removeAt(this.filters.length - 1);
      this.saveFilter.emit(this.filterForm);
    }
  }

  setSavedFilters(savedData: any[]) {
    this.filters.clear();
    savedData.forEach((filterData) => {
      const newFilter = this.generateFilter();
      newFilter.patchValue({
        sheetId: filterData.sheetId,
        community: filterData.community,
        passingPrecent: filterData.passingPrecent,
      });
      this.filters.push(newFilter);
    });
    this.updateLastRowValidation();
  }

  updateLastRowValidation() {
    const length = this.filters.length;
    if (length === 1) {
      const firstRow = this.filters.controls[0];
      firstRow.get('sheetId')?.setValidators([Validators.required]);
      firstRow.get('community')?.setValidators([Validators.required]);
      firstRow.get('passingPrecent')?.setValidators([Validators.required]);

      firstRow.get('sheetId')?.updateValueAndValidity();
      firstRow.get('community')?.updateValueAndValidity();
      firstRow.get('passingPrecent')?.updateValueAndValidity();
    } else {
      this.filters.controls.forEach((filterGroup, index) => {
        if (index === length - 1) {
          filterGroup.get('sheetId')?.clearValidators();
          filterGroup.get('community')?.clearValidators();
          filterGroup.get('passingPrecent')?.clearValidators();
        } else {
          filterGroup.get('sheetId')?.setValidators([Validators.required]);
          filterGroup.get('community')?.setValidators([Validators.required]);
          filterGroup
            .get('passingPrecent')
            ?.setValidators([Validators.required]);
        }
        filterGroup.get('sheetId')?.updateValueAndValidity();
        filterGroup.get('community')?.updateValueAndValidity();
        filterGroup.get('passingPrecent')?.updateValueAndValidity();
      });
    }
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
