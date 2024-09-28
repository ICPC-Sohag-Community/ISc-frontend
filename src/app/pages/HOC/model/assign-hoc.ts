export interface Trainee {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  photoUrl: string;
  college: number;
  gender: number;
  grade: number;
}

export interface Mentor {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  college: number;
  grade: number;
  trainees: Trainee[];
}
