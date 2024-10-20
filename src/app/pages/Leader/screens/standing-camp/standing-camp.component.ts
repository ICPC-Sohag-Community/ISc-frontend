import { Component, inject, OnInit, signal } from '@angular/core';
import { CampLeaderService } from '../../services/camp-leader.service';
import { AchiverCamp } from '../../model/camp';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-standing-camp',
  standalone: true,
  imports: [NgClass],
  templateUrl: './standing-camp.component.html',
  styleUrl: './standing-camp.component.scss',
})
export class StandingCampComponent implements OnInit {
  campLeaderService = inject(CampLeaderService);
  route = inject(ActivatedRoute);
  achiverCamp!: AchiverCamp;
  isLoading = signal<boolean>(false);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const campId = parseInt(params['id']);
      this.fetchAllWithPagination(campId);
    });
  }

  fetchAllWithPagination(campId: number): void {
    this.isLoading.set(true);
    this.campLeaderService.standingCamp(campId).subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.achiverCamp = data;
          this.isLoading.update((v) => (v = false));
        } else {
          this.isLoading.update((v) => (v = false));
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading.update((v) => (v = false));
      },
    });
  }
}
