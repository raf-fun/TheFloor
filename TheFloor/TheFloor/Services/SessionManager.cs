using System.Collections.Concurrent;
using TheFloor.Model.Session;

namespace TheFloor.Services
{
    public class SessionManager
    {
        private readonly ConcurrentDictionary<string, SessionInfo> _sessions = new();

        public SessionInfo Create(string hostConnectionId)
        {
            string id;
            do
            {
                id = Guid.NewGuid().ToString("N")[..6].ToUpperInvariant();
            } while (_sessions.ContainsKey(id));

            var info = new SessionInfo { Id = id, HostConnectionId = hostConnectionId };
            _sessions[id] = info;
            return info;
        }

        public bool Exists(string id) => _sessions.ContainsKey(id);
        public bool Get(string id, out SessionInfo? info) => _sessions.TryGetValue(id, out info);
        public bool Remove(string id) => _sessions.TryRemove(id, out _);
        public IEnumerable<SessionInfo> GetAll() => _sessions.Values;
    }
}
