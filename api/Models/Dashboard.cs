namespace TeacherDashboardAPI.Models;

public class School
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
}

public class Test
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public int MaxScore { get; set; }
}

public class Student
{
    public string Id { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string StudentId { get; set; } = string.Empty;
    public string Grade { get; set; } = string.Empty;
}

public class StudentScore
{
    public string StudentId { get; set; } = string.Empty;
    public string TestId { get; set; } = string.Empty;
    public int Score { get; set; }
    public int Percentile { get; set; }
    public string TestDate { get; set; } = string.Empty;
}

public class AggregateScore
{
    public string TestId { get; set; } = string.Empty;
    public string SchoolYear { get; set; } = string.Empty;
    public double ClassAverage { get; set; }
    public double SchoolAverage { get; set; }
    public double DistrictAverage { get; set; }
    public int TotalStudents { get; set; }
}

public class HistoricalPerformance
{
    public string Year { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public double ClassAverage { get; set; }
    public double SchoolAverage { get; set; }
    public double DistrictAverage { get; set; }
}

public class DashboardData
{
    public List<Student> Students { get; set; } = new();
    public List<StudentScore> Scores { get; set; } = new();
    public AggregateScore AggregateScores { get; set; } = new();
    public List<HistoricalPerformance> HistoricalPerformance { get; set; } = new();
}
