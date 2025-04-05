using Microsoft.EntityFrameworkCore;
using backend.Data;


var builder = WebApplication.CreateBuilder(args);

// Enable CORS (Corrected Version)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173",
                "https://ambitious-pebble-07342301e.6.azurestaticapps.net") // Allow frontend
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddDbContext<BookstoreContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Apply CORS BEFORE Authorization
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();
app.Run();
