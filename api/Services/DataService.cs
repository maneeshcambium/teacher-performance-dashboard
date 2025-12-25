using System.Text.Json;
using TeacherDashboardAPI.Models;

namespace TeacherDashboardAPI.Services;

public interface IDataService
{
    Task<List<User>> GetUsersAsync();
    Task<List<School>> GetSchoolsAsync();
    Task<List<Test>> GetTestsAsync();
    Task<List<Student>> GetStudentsAsync();
    Task<List<StudentScore>> GetScoresAsync();
    Task<List<HistoricalPerformance>> GetHistoricalPerformanceAsync();
}

public class DataService : IDataService
{
    private readonly string _dataPath;

    public DataService(IWebHostEnvironment environment)
    {
        _dataPath = Path.Combine(environment.ContentRootPath, "Data");
    }

    public async Task<List<User>> GetUsersAsync()
    {
        return await ReadJsonFileAsync<User>("users.json");
    }

    public async Task<List<School>> GetSchoolsAsync()
    {
        return await ReadJsonFileAsync<School>("schools.json");
    }

    public async Task<List<Test>> GetTestsAsync()
    {
        return await ReadJsonFileAsync<Test>("tests.json");
    }

    public async Task<List<Student>> GetStudentsAsync()
    {
        return await ReadJsonFileAsync<Student>("students.json");
    }

    public async Task<List<StudentScore>> GetScoresAsync()
    {
        return await ReadJsonFileAsync<StudentScore>("scores.json");
    }

    public async Task<List<HistoricalPerformance>> GetHistoricalPerformanceAsync()
    {
        return await ReadJsonFileAsync<HistoricalPerformance>("historicalPerformance.json");
    }

    private async Task<List<T>> ReadJsonFileAsync<T>(string fileName)
    {
        var filePath = Path.Combine(_dataPath, fileName);
        
        if (!File.Exists(filePath))
        {
            return new List<T>();
        }

        var jsonString = await File.ReadAllTextAsync(filePath);
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        return JsonSerializer.Deserialize<List<T>>(jsonString, options) ?? new List<T>();
    }
}
