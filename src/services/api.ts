import axios from 'axios';
import type { 
  LoginCredentials, 
  AuthResponse, 
  Student, 
  StudentScore, 
  AggregateScore,
  HistoricalPerformance,
  School,
  Test 
} from '../types';

// API base URL - pointing to .NET backend
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('Invalid credentials');
    }
    throw new Error('Login failed');
  }
};

// Get schools data
export const getSchools = async (): Promise<School[]> => {
  try {
    const response = await apiClient.get<School[]>('/schools');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch schools:', error);
    throw error;
  }
};

// Get tests data
export const getTests = async (): Promise<Test[]> => {
  try {
    const response = await apiClient.get<Test[]>('/tests');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tests:', error);
    throw error;
  }
};

// Get dashboard data
export const getDashboardData = async (
  schoolId: string,
  schoolYear: string,
  testId: string
): Promise<{
  students: Student[];
  scores: StudentScore[];
  aggregateScores: AggregateScore;
  historicalPerformance: HistoricalPerformance[];
}> => {
  try {
    const response = await apiClient.get('/dashboard', {
      params: { schoolId, schoolYear, testId }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    throw error;
  }
};
