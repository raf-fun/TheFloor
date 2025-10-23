namespace TheFloor.Model.Session
{
    public class SessionInfo
    {
            public string Id { get; init; } = default!;
            public string HostConnectionId { get; init; } = default!;
            public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
            public string? Pin { get; init; } 
    }
}
