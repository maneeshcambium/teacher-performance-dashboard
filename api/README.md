# Teacher Dashboard API

A .NET Web API backend for the Teacher Performance Dashboard application.

## Technologies

- .NET 8.0
- JWT Authentication
- In-Memory Caching
- Swagger/OpenAPI

## Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

### Installation

1. Navigate to the API directory:
   ```bash
   cd api
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the application:
   ```bash
   dotnet run
   ```

The API will be available at:
- HTTP: http://localhost:5000
- HTTPS: https://localhost:5001
- Swagger UI: http://localhost:5000/swagger

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login (returns JWT token)

### Data Endpoints (Require Authentication)
- `GET /api/schools` - Get list of schools
- `GET /api/tests` - Get list of tests
- `GET /api/dashboard?schoolId={id}&schoolYear={year}&testId={id}` - Get dashboard data

## Mock Credentials

Username: `teacher`  
Password: `password`

## Features

- **JWT Authentication**: Secure token-based authentication
- **In-Memory Caching**: Improves performance by caching frequently accessed data
- **CORS**: Configured to allow requests from React app (localhost:5173, localhost:3000)
- **Mock Data**: All data is served from JSON files in the `Data` directory
- **Swagger**: Interactive API documentation

## Project Structure

```
api/
├── Controllers/        # API controllers
├── Data/              # JSON mock data files
├── Models/            # Data models and DTOs
├── Services/          # Business logic services
├── Properties/        # Launch settings
├── Program.cs         # Application entry point
└── appsettings.json   # Configuration
```
