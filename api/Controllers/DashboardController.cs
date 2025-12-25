using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using TeacherDashboardAPI.Models;
using TeacherDashboardAPI.Services;

namespace TeacherDashboardAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IDataService _dataService;
    private readonly IMemoryCache _cache;
    private readonly ILogger<DashboardController> _logger;

    public DashboardController(
        IDataService dataService,
        IMemoryCache cache,
        ILogger<DashboardController> logger)
    {
        _dataService = dataService;
        _cache = cache;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<DashboardData>> GetDashboardData(
        [FromQuery] string schoolId,
        [FromQuery] string schoolYear,
        [FromQuery] string testId)
    {
        try
        {
            if (string.IsNullOrEmpty(schoolId) || string.IsNullOrEmpty(schoolYear) || string.IsNullOrEmpty(testId))
            {
                return BadRequest(new { message = "schoolId, schoolYear, and testId are required" });
            }

            var cacheKey = $"dashboard_{schoolId}_{schoolYear}_{testId}";
            
            if (!_cache.TryGetValue(cacheKey, out DashboardData? data))
            {
                await Task.Delay(600); // Simulate delay
                
                var students = await _dataService.GetStudentsAsync();
                var scores = await _dataService.GetScoresAsync();
                var historicalPerformance = await _dataService.GetHistoricalPerformanceAsync();
                
                // Filter scores by testId
                var testScores = scores.Where(s => s.TestId == testId).ToList();
                
                // Calculate aggregates
                var classAverage = testScores.Any() ? testScores.Average(s => s.Score) : 0;
                
                data = new DashboardData
                {
                    Students = students,
                    Scores = testScores,
                    AggregateScores = new AggregateScore
                    {
                        TestId = testId,
                        SchoolYear = schoolYear,
                        ClassAverage = Math.Round(classAverage, 1),
                        SchoolAverage = 81.5,
                        DistrictAverage = 79.3,
                        TotalStudents = students.Count
                    },
                    HistoricalPerformance = historicalPerformance
                };
                
                var cacheOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(10));
                
                _cache.Set(cacheKey, data, cacheOptions);
            }

            return Ok(data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving dashboard data");
            return StatusCode(500, new { message = "An error occurred while retrieving dashboard data" });
        }
    }
}
