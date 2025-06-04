export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  bloodGroup: string;
  height: number;
  weight: number;
  admissionDate: string;
  dischargeDate?: string;
  diagnosis: string;
  status: 'admitted' | 'discharged' | 'pending';
}

export interface PatientState {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  selectedPatient: Patient | null;
} 