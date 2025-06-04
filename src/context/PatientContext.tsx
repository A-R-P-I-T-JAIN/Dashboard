import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import type { Patient } from '../types/patient';
import type { ReactNode } from 'react';

interface PatientContextType {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  selectedPatient: Patient | null;
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (id: number) => void;
  setSelectedPatient: (patient: Patient | null) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://dummyjson.com/users');
      const statuses: ('admitted' | 'discharged' | 'pending')[] = ['admitted', 'discharged', 'pending'];
      const formattedPatients = response.data.users.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        height: user.height,
        weight: user.weight,
        admissionDate: new Date().toISOString(),
        diagnosis: 'Initial checkup',
        status: statuses[Math.floor(Math.random() * statuses.length)],
      }));
      setPatients(formattedPatients);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient = { ...patient, id: Math.random() * 1000 };
    setPatients(prev => [...prev, newPatient]);
  };

  const updatePatient = (patient: Patient) => {
    setPatients(prev => prev.map(p => p.id === patient.id ? patient : p));
  };

  const deletePatient = (id: number) => {
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        loading,
        error,
        selectedPatient,
        addPatient,
        updatePatient,
        deletePatient,
        setSelectedPatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatients() {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
} 