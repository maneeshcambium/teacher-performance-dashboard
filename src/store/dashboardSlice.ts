import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Student, StudentScore, AggregateScore, HistoricalPerformance } from '../types';

interface DashboardState {
  students: Student[];
  scores: StudentScore[];
  aggregateScores: AggregateScore | null;
  historicalPerformance: HistoricalPerformance[];
  selectedSchoolId: string | null;
  selectedSchoolYear: string | null;
  selectedTestId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  students: [],
  scores: [],
  aggregateScores: null,
  historicalPerformance: [],
  selectedSchoolId: null,
  selectedSchoolYear: null,
  selectedTestId: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedSchool: (state, action: PayloadAction<string>) => {
      state.selectedSchoolId = action.payload;
    },
    setSelectedSchoolYear: (state, action: PayloadAction<string>) => {
      state.selectedSchoolYear = action.payload;
    },
    setSelectedTest: (state, action: PayloadAction<string>) => {
      state.selectedTestId = action.payload;
    },
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<{
      students: Student[];
      scores: StudentScore[];
      aggregateScores: AggregateScore;
      historicalPerformance: HistoricalPerformance[];
    }>) => {
      state.students = action.payload.students;
      state.scores = action.payload.scores;
      state.aggregateScores = action.payload.aggregateScores;
      state.historicalPerformance = action.payload.historicalPerformance;
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearDashboardData: (state) => {
      state.students = [];
      state.scores = [];
      state.aggregateScores = null;
      state.historicalPerformance = [];
    },
  },
});

export const {
  setSelectedSchool,
  setSelectedSchoolYear,
  setSelectedTest,
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  clearDashboardData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
