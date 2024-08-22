export interface TrineeData {
}
export interface CurrentSheet {
  endDate: string
  id: number
  name: string
  problemCount: number
  sheetLink: string
  startDate:string
  problemSolvedCount:number
}
export interface InComingContest {
  id: number
  isRunning: boolean
  link: string
  name:  string
  remainTime: {
                days: number
                hours: number,
                minutes: number,
                seconds: number,
              }
}

export interface NextSession {
  campId: number
  endDate: string
  id: number
  instructorName: string
  locationLink: string
  locationName: string
  startDate: string
  topic: string
}
export interface Mentor {
  id: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  phoneNumber: string
  college: string
  photoUrl: string
  about: string
  facebookLink: string
  codeForceHandle: string
  vjudgeHandle: string
}



