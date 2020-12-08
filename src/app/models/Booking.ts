export class Booking {
  PatientId: string;
  GroupId: string;
  ReservationDate: Date;
  ServiceId: string;
  DoctorId: string;
  ViaMobileApp: Boolean = true;
  EyeType: EyeType;
  BranchId: string;
  Come: Boolean = false;
  CreatedDt: Date = new Date();
  DoctorName: string;
}

export enum EyeType{
  Left = 0,
  Right,
  Both,
  None,
  Oral
}