import { EyeType } from "./Booking";

export class NewPatientBooking {
    GroupId: string
    ReservationDate: Date
    ServiceId: string
    DoctorId: string
    EyeType: EyeType
    BranchId: string
    CreatedDt: Date = new Date()
    FNameAr: string
    MiddleNameAr: string
    LastnameAr: string
    FNameEn: string
    MiddleNameEn: string
    LastNameEn: string
    DOB: Date
    Mobile: string
    BranchNumber: string
    PatientNumber: number
    Gender: Boolean
    Status: ClientStatus = ClientStatus.Pending
    UserId:string;
  }

  export enum ClientStatus{
      Pending = 2
  }