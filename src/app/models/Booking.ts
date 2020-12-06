export class Booking {
  PatientId: string;
  GroupId: string;
  ReservationDate: Date;
  ServiceId: string;
  DoctorId: string;
  ViaMobileApp: Boolean = true;
  EyeType: number;
  BranchId: string;
  Come: Boolean = false;
}