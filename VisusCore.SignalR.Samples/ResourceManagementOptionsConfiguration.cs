using Microsoft.Extensions.Options;
using OrchardCore.ResourceManagement;
using VisusCore.SignalR.Samples.Constants;

namespace VisusCore.SignalR.Samples;

public class ResourceManagementOptionsConfiguration : IConfigureOptions<ResourceManagementOptions>
{
    private const string Root = "~/" + FeatureIds.Area;
    private const string Scripts = Root + "/js";

    private static readonly ResourceManifest _manifest = new();

    static ResourceManagementOptionsConfiguration() =>
        _manifest
            .DefineScript(ResourceNames.SignalRSampleApp)
            .SetUrl(Scripts + "/App.min.js", Scripts + "/App.js");

    public void Configure(ResourceManagementOptions options) => options.ResourceManifests.Add(_manifest);
}
