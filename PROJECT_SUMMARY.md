# Teacher Performance Dashboard - Project Summary

## Overview

A full-stack web application for teachers to view and analyze student performance across multiple tests and subjects. The application provides data visualization, aggregate statistics, and historical performance trends.

---

## Technology Stack

### Frontend
- **React 19** - Latest React with modern hooks
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **TailWind CSS 3.4** - Utility-first CSS framework
- **Chart.js** with react-chartjs-2 - Data visualization
- **Axios** - HTTP client for API calls
- **Vite 7** - Fast build tool and dev server

### Backend
- **.NET 8.0** - Web API framework
- **JWT Authentication** - Secure token-based authentication
- **In-Memory Caching** - Performance optimization
- **Swagger/OpenAPI** - API documentation
- **JSON File Storage** - Mock data persistence

---

## Project Structure

```
learnreact/
├── src/                          # React Frontend
│   ├── components/              # Reusable UI components
│   │   ├── AggregateScoresCard.tsx
│   │   ├── PerformanceCharts.tsx
│   │   └── StudentList.tsx
│   ├── pages/                   # Page components
│   │   ├── Login.tsx
│   │   └── Dashboard.tsx
│   ├── store/                   # Redux state management
│   │   ├── authSlice.ts
│   │   ├── dashboardSlice.ts
│   │   ├── hooks.ts
│   │   └── index.ts
│   ├── services/                # API services
│   │   └── api.ts
│   ├── types/                   # TypeScript definitions
│   │   └── index.ts
│   ├── router/                  # Routing configuration
│   │   └── AppRouter.tsx
│   ├── App.tsx                  # Root component
│   └── main.tsx                 # Application entry point
│
├── api/                         # .NET Web API Backend
│   ├── Controllers/             # API endpoints
│   │   ├── AuthController.cs
│   │   ├── SchoolsController.cs
│   │   ├── TestsController.cs
│   │   └── DashboardController.cs
│   ├── Models/                  # Data models and DTOs
│   │   ├── User.cs
│   │   └── Dashboard.cs
│   ├── Services/                # Business logic
│   │   ├── TokenService.cs
│   │   └── DataService.cs
│   ├── Data/                    # JSON mock data
│   │   ├── users.json
│   │   ├── schools.json
│   │   ├── tests.json
│   │   ├── students.json
│   │   ├── scores.json
│   │   └── historicalPerformance.json
│   ├── Program.cs               # API configuration
│   └── appsettings.json         # Application settings
│
└── .github/agents/              # Project specifications
    ├── reactbuilder.agent.md
    └── apibuilder.md
```

---

## Features

### 1. Authentication
- **Login Page** with username/password
- JWT token-based authentication
- Protected routes requiring authentication
- Automatic token management
- **Demo Credentials:**
  - Username: `teacher`
  - Password: `password`

### 2. Dashboard
- **School Selection** - Choose from multiple schools
- **School Year Filter** - Select academic year (2021-2026)
- **Test Selection** - Pick from Math, ELA, Science, Social tests
- **Real-time Data Loading** - With loading indicators

### 3. Data Visualization

#### Aggregate Scores Cards
- **Class Average** - Overall class performance with student count
- **School Average** - School-wide performance metrics
- **District Average** - District-level comparison
- Beautiful gradient cards with icons

#### Student Performance Table
- Complete student roster with:
  - Student ID and Name
  - Grade level
  - Test scores (color-coded by performance)
  - Percentile rankings
- Sortable and filterable data
- Hover effects for better UX

#### Performance Charts
- **Bar Chart** - Current performance comparison (Class vs School vs District)
- **Line Chart** - Historical performance trends over 4 years
- Interactive Chart.js visualizations
- Responsive design for all screen sizes

### 4. UI/UX Features
- **Modern Design** - Gradient backgrounds and shadows
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Loading States** - Dual-ring spinner animations
- **Empty States** - Helpful messages when no data is selected
- **Error Handling** - User-friendly error messages
- **Smooth Transitions** - Hover effects and animations

---

## API Endpoints

### Authentication
```
POST /api/auth/login
Request: { username: string, password: string }
Response: { user: UserDto, token: string }
```

### Data Endpoints (Require JWT Token)
```
GET /api/schools
Response: School[]

GET /api/tests
Response: Test[]

GET /api/dashboard?schoolId={id}&schoolYear={year}&testId={id}
Response: {
  students: Student[],
  scores: StudentScore[],
  aggregateScores: AggregateScore,
  historicalPerformance: HistoricalPerformance[]
}
```

---

## Data Models

### User
```typescript
{
  id: string
  username: string
  name: string
  email: string
  role: 'teacher' | 'admin'
}
```

### Student
```typescript
{
  id: string
  firstName: string
  lastName: string
  studentId: string
  grade: string
}
```

### StudentScore
```typescript
{
  studentId: string
  testId: string
  score: number
  percentile: number
  testDate: string
}
```

### AggregateScore
```typescript
{
  testId: string
  schoolYear: string
  classAverage: number
  schoolAverage: number
  districtAverage: number
  totalStudents: number
}
```

---

## Setup Instructions

### Prerequisites
- **Node.js** 18+ (for React app)
- **.NET 8.0 SDK** (for API backend)

### Frontend Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Access application
http://localhost:5173
```

### Backend Setup

```bash
# Navigate to API directory
cd api

# Restore dependencies
dotnet restore

# Run the API
dotnet run

# Access Swagger UI
http://localhost:5000/swagger
```

---

## Configuration

### Frontend Configuration
- **Vite Config**: `vite.config.ts`
- **TailWind Config**: `tailwind.config.js`
- **PostCSS Config**: `postcss.config.js`
- **TypeScript Config**: `tsconfig.json`, `tsconfig.app.json`

### Backend Configuration
- **App Settings**: `api/appsettings.json`
- **JWT Settings**: Secret key, issuer, audience, expiration
- **CORS**: Configured for `http://localhost:5173` and `http://localhost:3000`
- **Cache Settings**: 30-minute default expiration

---

## Security Features

### JWT Authentication
- Secure token generation with HS256 algorithm
- Token expiration (60 minutes default)
- Authorization header validation
- Protected API endpoints

### CORS Configuration
- Restricted origins (React app only)
- Credentials support
- Method and header validation

### Data Security
- Password validation (server-side)
- No sensitive data in client storage
- Token-based session management

---

## Performance Optimizations

### Frontend
- **Code Splitting** - Lazy loading with React Router
- **Memoization** - React hooks optimization
- **Bundle Optimization** - Vite production builds
- **CSS Optimization** - TailWind CSS purging

### Backend
- **In-Memory Caching** - Reduces JSON file reads
- **Async/Await** - Non-blocking I/O operations
- **Response Compression** - Reduced payload sizes
- **Efficient Data Structures** - LINQ optimizations

---

## Mock Data

The application includes comprehensive mock data:
- **2 Users** (teacher, admin)
- **3 Schools** (Elementary, Middle, High)
- **4 Tests** (Math, ELA, Science, Social)
- **10 Students** with complete profiles
- **10 Student Scores** per test
- **4 Years** of historical performance data

---

## Color Scheme

### Gradients
- **Primary**: Blue to Indigo (`from-blue-600 to-indigo-600`)
- **Background**: Gray to Blue to Indigo
- **Success**: Green shades
- **Warning**: Amber/Yellow shades
- **Danger**: Red shades

### Score Colors
- **90-100**: Green (Excellent)
- **80-89**: Blue (Good)
- **70-79**: Yellow (Fair)
- **Below 70**: Red (Needs Improvement)

---

## Future Enhancements

### Potential Features
1. **User Management** - Admin panel for user CRUD
2. **Data Export** - CSV/PDF export functionality
3. **Advanced Filtering** - Multi-criteria search
4. **Real Database** - SQL Server or PostgreSQL integration
5. **Email Notifications** - Performance alerts
6. **Mobile App** - React Native version
7. **Advanced Analytics** - Predictive modeling
8. **Accessibility** - WCAG 2.1 compliance
9. **Multi-language** - i18n support
10. **Dark Mode** - Theme switching

### Technical Improvements
1. **Unit Tests** - Jest, React Testing Library
2. **E2E Tests** - Playwright or Cypress
3. **CI/CD** - GitHub Actions pipeline
4. **Docker** - Containerization
5. **Monitoring** - Application Insights
6. **Logging** - Structured logging with Serilog
7. **API Versioning** - v1, v2 endpoints
8. **Rate Limiting** - API throttling
9. **WebSockets** - Real-time updates
10. **Progressive Web App** - Offline support

---

## Troubleshooting

### Common Issues

**Issue**: TailWind CSS not working
- **Solution**: Ensure TailWind v3.4 is installed, check `postcss.config.js`

**Issue**: API connection refused
- **Solution**: Verify .NET API is running on port 5000

**Issue**: CORS errors
- **Solution**: Check React app URL in API CORS configuration

**Issue**: TypeScript errors with imports
- **Solution**: Set `verbatimModuleSyntax: false` in `tsconfig.app.json`

**Issue**: JWT token expired
- **Solution**: Re-login to get new token (60-minute expiration)

---

## Development Commands

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
dotnet run           # Run API
dotnet build         # Build project
dotnet test          # Run tests
dotnet watch run     # Run with hot reload
```

---

## Credits

**Built with:**
- React Team - React framework
- Microsoft - .NET framework
- Vercel - Vite build tool
- TailWind Labs - TailWind CSS
- Chart.js Team - Charting library
- Redux Team - State management

---

## License

This project is for educational purposes.

---

## Contact

For questions or support, please refer to the project documentation.

---

**Last Updated**: December 23, 2025
