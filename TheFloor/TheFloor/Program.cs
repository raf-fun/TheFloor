using TheFloor.Components;
using TheFloor.Hubs;
using TheFloor.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents()
    .AddInteractiveWebAssemblyComponents();

//Add SessionManager
builder.Services.AddSingleton<SessionManager>();

builder.Services.AddSignalR();
//builder.Services.AddSignalR(e => {
//    e.MaximumReceiveMessageSize = 102400000;
//});

var app = builder.Build();

//Configure Hubs
app.MapHub<HostHub>("/hosthub");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode()
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(TheFloor.Client._Imports).Assembly);

app.Run();
