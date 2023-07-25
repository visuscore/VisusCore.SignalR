using Microsoft.AspNetCore.Mvc;

namespace VisusCore.SignalR.Samples.Controllers;

[Route("chat")]
public class ChatController : Controller
{
    public IActionResult Index() =>
        View();
}
