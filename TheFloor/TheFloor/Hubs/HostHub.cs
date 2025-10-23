using Microsoft.AspNetCore.SignalR;
using TheFloor.Services;

namespace TheFloor.Hubs
{
    public class HostHub(SessionManager sessManager) : Hub
    {
        public async Task JoinSession(string sessionId)
        {
            if (sessManager.Exists(sessionId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
            }
            else
            {
                //Return something to tell session not exsist
            }
        }
    }
}
