export interface traineesAnalysis {
  traineesCount: number;
  malesCount: number;
  femalesCount: number;
  collegesAnalisis: CollegesAnalisi[];
}

export interface CollegesAnalisi {
  name: string;
  count: number;
}

export interface dashboardFeedbacks {
  rate: number;
  feedback: string;
  photoUrl: any;
  fullName: string;
}

export interface CampInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  statusCode: number;
  isSuccess: boolean;
  message: any;
  data: Camp[];
  errors: any;
}

export interface Camp {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  term: number;
  durationInWeeks: number;
}
