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
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { StaffLeaderService } from '../../services/staff-leader.service';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-dropdown-roles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dropdown-roles.component.html',
  styleUrl: './dropdown-roles.component.scss',
})
export class DropdownRolesComponent implements OnInit {
  @Output() staffRequested = new EventEmitter<string>();
  @Input() selectedStaffId: string = '';
  dashboardService = inject(DashboardService);
  staffLeaderService = inject(StaffLeaderService);
  rolesService = inject(RolesService);
  fb = inject(FormBuilder);
  roleForm!: FormGroup;
  roles: any[] = [];
  allCamps: any[] = [];
  roleInfo!: { userId: string; role: string; campId: number };
  filteredRoles: any[] = [];
  extraRoles: any[] = [];
  newRole: any | null = null;
  selectedRole: any | null = null;
  dropdownOpen: boolean = false;
  dropdownCampForT: boolean = false;
  dropdownCampForH: boolean = false;
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.roleForm = this.fb.group({
      roleName: [''],
    });
    this.fetchAllRoles();
    this.fetchAllCamps();
    this.roleForm.get('roleName')?.valueChanges.subscribe((value) => {
      this.onSearchOrCreate();
    });
  }

  fetchAllRoles(): void {
    this.dashboardService.roles().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.roles = data;
          const basedRole = [
            'Leader',
            'Mentor',
            'Head_Of_Camp',
            'Trainee',
            'Instructor',
          ];
          this.extraRoles = this.roles.filter(
            (r) => !basedRole.includes(r.name)
          );
          this.filteredRoles = this.roles.filter(
            (r) => !this.extraRoles.includes(r)
          );
        } else {
          console.log('error');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  fetchAllCamps(): void {
    this.dashboardService.getAllCamps().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.allCamps = data;
        } else {
          console.log('error');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSearchOrCreate() {
    const searchTerm = this.roleForm.get('roleName')?.value || '';
    this.filteredRoles = this.roles.filter((role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchTerm && !this.roles.some((role) => role.name === searchTerm)) {
      this.newRole = { name: searchTerm };
    } else {
      this.newRole = null;
    }

    this.dropdownOpen = true;
  }

  onAddRole() {
    if (this.newRole) {
      debugger;
      this.filteredRoles.push(this.newRole);
      this.selectedRole = this.newRole;
      this.addNewRole(this.newRole.name);
      this.roleForm.reset();
      this.newRole = null;
      this.dropdownOpen = false;
    }
  }
  selectRole(role: any) {
    this.selectedRole = role;
    if (this.selectedRole.name === 'Trainee') {
      this.dropdownOpen = true;
      this.dropdownCampForT = true;
      this.dropdownCampForH = false;
    } else if (this.selectedRole.name === 'Head_Of_Camp') {
      this.dropdownOpen = true;
      this.dropdownCampForT = false;
      this.dropdownCampForH = true;
    } else {
      this.dropdownCampForH = false;
      this.dropdownCampForT = false;
      this.dropdownOpen = false;
      const roleInfo = {
        userId: this.selectedStaffId,
        role: this.selectedRole.name,
      };
      this.saveNewRoles(roleInfo);
    }
  }

  selectCamp(camp: any): void {
    const roleInfo = {
      userId: this.selectedStaffId,
      role: this.selectedRole.name,
      campId: camp.id,
    };
    this.saveNewRoles(roleInfo);
    this.dropdownOpen = false;
  }

  saveNewRoles(roleInfo: any): void {
    console.log(roleInfo);
    debugger;
    this.rolesService.assignToRole(roleInfo).subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.staffRequested.emit(this.selectedStaffId);
        } else {
          console.log('error');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addNewRole(roleName: string): void {
    console.log(roleName);
    this.rolesService.addNewRole(roleName).subscribe({
      next: ({ statusCode, data }) => {
        const roleInfo = {
          userId: this.selectedStaffId,
          role: roleName,
        };
        this.saveNewRoles(roleInfo);
        if (statusCode === 200) {
        } else {
          console.log('error');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteRole(roleName: string) {
    debugger;
    this.rolesService.removeRoleFromSystem(roleName).subscribe({
      next: ({ statusCode, data }) => {
        this.fetchAllRoles();
        // const roleInfo = {
        //   userId: this.selectedStaffId,
        //   role: roleName,
        // };
        // this.saveNewRoles(roleInfo);
        if (statusCode === 200) {
        } else {
          console.log('error');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDropdownFocus() {
    this.dropdownOpen = true;
    console.log('dro', this.dropdownOpen);
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.dropdownOpen) {
      this.dropdownOpen = false;
    }
  }

  closeDropdown() {
    // setTimeout(() => (this.dropdownOpen = false), 200); // Close the dropdown when focus is lost
  }
}
