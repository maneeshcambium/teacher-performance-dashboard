import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setSelectedSchool,
  setSelectedSchoolYear,
  setSelectedTest,
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} from '../store/dashboardSlice';
import { logout } from '../store/authSlice';
import { getSchools, getTests, getDashboardData } from '../services/api';
import type { School, Test } from '../types';
import StudentList from '../components/StudentList';
import AggregateScoresCard from '../components/AggregateScoresCard';
import PerformanceCharts from '../components/PerformanceCharts';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    students,
    scores,
    aggregateScores,
    historicalPerformance,
    selectedSchoolId,
    selectedSchoolYear,
    selectedTestId,
    loading,
  } = useAppSelector((state) => state.dashboard);

  const [schools, setSchools] = useState<School[]>([]);
  const [tests, setTests] = useState<Test[]>([]);

  const schoolYears = ['2021-2022', '2022-2023', '2023-2024', '2024-2025', '2025-2026'];

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [schoolsData, testsData] = await Promise.all([getSchools(), getTests()]);
        setSchools(schoolsData);
        setTests(testsData);
      } catch (error) {
        console.error('Failed to load initial data:', error);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedSchoolId && selectedSchoolYear && selectedTestId) {
      loadDashboardData();
    }
  }, [selectedSchoolId, selectedSchoolYear, selectedTestId]);

  const loadDashboardData = async () => {
    if (!selectedSchoolId || !selectedSchoolYear || !selectedTestId) return;

    dispatch(fetchDataStart());
    try {
      const data = await getDashboardData(selectedSchoolId, selectedSchoolYear, selectedTestId);
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error instanceof Error ? error.message : 'Failed to load data'));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Performance Dashboard</h1>
                <p className="text-sm text-gray-600 mt-0.5">Welcome back, {user?.name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Select Criteria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="school" className="block text-sm font-semibold text-gray-700 mb-2">
                School
              </label>
              <select
                id="school"
                value={selectedSchoolId || ''}
                onChange={(e) => dispatch(setSelectedSchool(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              >
                <option value="">Select a school</option>
                {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="schoolYear" className="block text-sm font-semibold text-gray-700 mb-2">
                School Year
              </label>
              <select
                id="schoolYear"
                value={selectedSchoolYear || ''}
                onChange={(e) => dispatch(setSelectedSchoolYear(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              >
                <option value="">Select a year</option>
                {schoolYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="test" className="block text-sm font-semibold text-gray-700 mb-2">
                Test
              </label>
              <select
                id="test"
                value={selectedTestId || ''}
                onChange={(e) => dispatch(setSelectedTest(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              >
                <option value="">Select a test</option>
                {tests.map((test) => (
                  <option key={test.id} value={test.id}>
                    {test.name} ({test.subject})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
            </div>
          </div>
        )}

        {!loading && aggregateScores && (
          <>
            <AggregateScoresCard aggregateScores={aggregateScores} />
            <StudentList students={students} scores={scores} />
            {historicalPerformance.length > 0 && (
              <PerformanceCharts
                historicalData={historicalPerformance}
                classAverage={aggregateScores.classAverage}
                schoolAverage={aggregateScores.schoolAverage}
                districtAverage={aggregateScores.districtAverage}
              />
            )}
          </>
        )}

        {!loading && !aggregateScores && (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-100">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-4">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Data Available</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Please select a school, school year, and test from the filters above to view performance data and analytics.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
