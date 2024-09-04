import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
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
  @Output() saveFilter = new EventEmitter<Form>();
  @Output() clickOutside = new EventEmitter<void>();
  elementRef = inject(ElementRef);
  fb = inject(NonNullableFormBuilder);
  filterForm!: Form;

  ngOnInit() {
    this.filterForm = this.fb.group({
      filters: this.fb.array<FormFilter>([this.generateFilter()]),
    }) as Form;
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

    if (this.filterForm.valid) {
      this.saveFilter.emit(this.filterForm);
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
