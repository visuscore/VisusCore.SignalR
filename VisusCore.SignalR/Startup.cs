using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using OrchardCore.Modules;
using System;

namespace VisusCore.SignalR;

public class Startup : StartupBase
{
    public override void ConfigureServices(IServiceCollection services)
    {
        // Disable the WebSocket keep alive since SignalR has it's own.
        services.Configure<WebSocketOptions>(options => options.KeepAliveInterval = TimeSpan.Zero)
            .TryAddEnumerable(ServiceDescriptor.Singleton<IConfigureOptions<HubOptions>, HubOptionsSetup>());
        services.AddSignalRCore()
            .AddJsonProtocol();
    }

    public override void Configure(IApplicationBuilder app, IEndpointRouteBuilder routes, IServiceProvider serviceProvider) =>
        app.UseWebSockets();
}
