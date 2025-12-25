using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using TeacherDashboardAPI.Models;
using TeacherDashboardAPI.Services;

namespace TeacherDashboardAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TestsController : ControllerBase
{
    private readonly IDataService _dataService;
    private readonly IMemoryCache _cache;
    private readonly ILogger<TestsController> _logger;

    public TestsController(
        IDataService dataService,
        IMemoryCache cache,
        ILogger<TestsController> logger)
    {
        _dataService = dataService;
        _cache = cache;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<List<Test>>> GetTests()
    {
        try
        {
            const string cacheKey = "tests";
            
            if (!_cache.TryGetValue(cacheKey, out List<Test>? tests))
            {
                await Task.Delay(300); // Simulate delay
                tests = await _dataService.GetTestsAsync();
                
                var cacheOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(30));
                
                _cache.Set(cacheKey, tests, cacheOptions);
            }

            return Ok(tests);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving tests");
            return StatusCode(500, new { message = "An error occurred while retrieving tests" });
        }
    }
}
