import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { dashboardFeedbacks } from '../../model/dashboard';
import { NgClass } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [NgClass],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss',
})
export class TestimonialComponent implements OnInit {
  dashboardService = inject(DashboardService);
  currentPage: number = 0;
  dashboardFeedbacks: dashboardFeedbacks[] = [];
  ngOnInit() {
    this.fetchDashboardFeedbacks();
    console.log(this.getStarsArray(4));
  }

  fetchDashboardFeedbacks(): void {
    this.dashboardService.dashboardFeedbacks().subscribe({
      next: ({ statusCode, data }) => {
        if (statusCode === 200) {
          this.dashboardFeedbacks = data;
        } else {
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  prevTestimonial(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextTestimonial(): void {
    if (this.currentPage < this.dashboardFeedbacks.length - 1) {
      this.currentPage++;
    }
  }

  getStarsArray(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return [
      ...Array(fullStars).fill('filled'),
      ...Array(halfStar ? 1 : 0).fill('half'),
      ...Array(emptyStars).fill('empty'),
    ];
  }
}
