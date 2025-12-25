export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'teacher' | 'admin';
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string;
  grade: string;
}

export interface School {
  id: string;
  name: string;
  district: string;
}

export interface Test {
  id: string;
  name: string;
  subject: 'Math' | 'ELA' | 'Science' | 'Social' | 'Other';
  maxScore: number;
}

export interface StudentScore {
  studentId: string;
  testId: string;
  score: number;
  percentile: number;
  testDate: string;
}

export interface AggregateScore {
  testId: string;
  schoolYear: string;
  classAverage: number;
  schoolAverage: number;
  districtAverage: number;
  totalStudents: number;
}

export interface HistoricalPerformance {
  year: string;
  subject: string;
  classAverage: number;
  schoolAverage: number;
  districtAverage: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type SchoolYear = '2021-2022' | '2022-2023' | '2023-2024' | '2024-2025' | '2025-2026';
