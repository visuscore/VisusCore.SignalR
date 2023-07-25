using OrchardCore.Modules.Manifest;
using VisusCore.SignalR.Constants;

[assembly: Module(
    Name = "VisusCore SignalR - Samples",
    Author = "VisusCore",
    Version = "0.0.1",
    Description = "SignalR integration samples.",
    Category = "VisusCore",
    Website = "https://github.com/visuscore/VisusCore.SignalR",
    Dependencies = new[]
    {
        FeatureIds.Module,
    }
)]
