using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using TeacherDashboardAPI.Models;
using TeacherDashboardAPI.Services;

namespace TeacherDashboardAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SchoolsController : ControllerBase
{
    private readonly IDataService _dataService;
    private readonly IMemoryCache _cache;
    private readonly ILogger<SchoolsController> _logger;

    public SchoolsController(
        IDataService dataService,
        IMemoryCache cache,
        ILogger<SchoolsController> logger)
    {
        _dataService = dataService;
        _cache = cache;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<List<School>>> GetSchools()
    {
        try
        {
            const string cacheKey = "schools";
            
            if (!_cache.TryGetValue(cacheKey, out List<School>? schools))
            {
                await Task.Delay(300); // Simulate delay
                schools = await _dataService.GetSchoolsAsync();
                
                var cacheOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(30));
                
                _cache.Set(cacheKey, schools, cacheOptions);
            }

            return Ok(schools);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving schools");
            return StatusCode(500, new { message = "An error occurred while retrieving schools" });
        }
    }
}
