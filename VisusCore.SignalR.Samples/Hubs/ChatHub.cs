using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace VisusCore.SignalR.Samples.Hubs;
public class ChatHub : Hub
{
    public Task SendAsync(string name, string message) =>
        // Call the broadcastMessage method to update clients.
        Clients.All.SendAsync("broadcastMessage", name, message, Context.ConnectionAborted);
}
