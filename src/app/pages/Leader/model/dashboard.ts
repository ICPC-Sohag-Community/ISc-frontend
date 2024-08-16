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
