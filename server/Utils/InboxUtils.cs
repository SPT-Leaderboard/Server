using System.Text.Json;
using System.Text.Json.Serialization;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.Helpers;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Enums;
using SPTarkov.Server.Core.Services;
using SPTarkov.Server.Core.Utils;
using SPTarkov.Server.Core.Utils.Json.Converters;
using SPTLeaderboard.Models.Responses;

namespace SPTLeaderboard.Utils;

[Injectable(InjectionType.Singleton)]
public class InboxUtils(
    ItemUtils itemUtils,
    JsonUtil jsonUtil,
    MailSendService mailSendService,
    ILogger<InboxUtils> logger
)
{
    private static readonly HttpClient HttpClient = new();

    public async Task<bool> CheckInbox(MongoId sessionId)
    {
        try
        {
            UriBuilder uri = new UriBuilder("https://sptlb.yuyui.moe")
            {
                Path = "/api/main/inbox/checkInbox.php",
                Query = $"sessionId={sessionId}",
            };

            HttpResponseMessage request = await HttpClient.GetAsync(uri.Uri.AbsoluteUri);
            if (!request.IsSuccessStatusCode)
            {
                logger.LogError(
                    "Inbox check failed with status {ResponseStatusCode}",
                    request.StatusCode
                );
                return false;
            }

            string response = await request.Content.ReadAsStringAsync();
            logger.LogInformation("Received JSON {json}", response);
            CheckInboxResponseData? data = jsonUtil.Deserialize<CheckInboxResponseData>(
                response
            );
            if (data == null)
            {
                logger.LogError("JSON deserialized to NULL");
                return false;
            }

            var generatedItems = itemUtils.GetItemInstancesAsFiR(data.Items ?? []);
            mailSendService.SendDirectNpcMessageToPlayer(
                sessionId,
                "54cb50c76803fa8b248b4571", // Prapor
                MessageType.MessageWithItems,
                data.Message ?? "",
                generatedItems.ToList()
            );

            return true;
        }
        catch (Exception e)
        {
            logger.LogError(
                "Error when trying to check player's inbox: {Message} (SessionID: {sessionID}) {stacktrace}",
                [e.Message, sessionId, e.StackTrace]
            );
            return false;
        }
    }
}
