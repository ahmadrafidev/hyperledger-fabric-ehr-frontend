export interface PatientData {
    ID: string;
    Name: string;
    Gender: string;
    DateOfBirth: string;
    PhoneNumber: string;
    Address: string;
    Insurance: string;
    Medication: string;
    Diagnosis: string;
}

export interface PatientDataActual {
    ID: string;
    Name: string;
    Gender: string;
    DateOfBirth: string;
    PhoneNumber: string;
    Address: string;
    Insurance: string;
    Medication: string[];
    Diagnosis: string[];
}
