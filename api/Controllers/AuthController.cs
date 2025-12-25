using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using TeacherDashboardAPI.Models;
using TeacherDashboardAPI.Services;

namespace TeacherDashboardAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IDataService _dataService;
    private readonly ITokenService _tokenService;
    private readonly IMemoryCache _cache;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        IDataService dataService,
        ITokenService tokenService,
        IMemoryCache cache,
        ILogger<AuthController> logger)
    {
        _dataService = dataService;
        _tokenService = tokenService;
        _cache = cache;
        _logger = logger;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        try
        {
            _logger.LogInformation("Login attempt for username: {Username}", request.Username);
            
            // Simulate network delay
            await Task.Delay(800);

            var users = await _dataService.GetUsersAsync();
            _logger.LogInformation("Loaded {Count} users from data service", users.Count);
            
            var user = users.FirstOrDefault(u => 
                u.Username == request.Username && 
                u.PasswordHash == request.Password);

            if (user == null)
            {
                _logger.LogWarning("Login failed for username: {Username}. User found: {Found}", 
                    request.Username, users.Any(u => u.Username == request.Username));
                return Unauthorized(new { message = "Invalid credentials" });
            }

            var token = _tokenService.GenerateToken(user.Id, user.Username, user.Role);

            var response = new LoginResponse
            {
                User = new UserDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role
                },
                Token = token
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during login");
            return StatusCode(500, new { message = "An error occurred during login" });
        }
    }
}
