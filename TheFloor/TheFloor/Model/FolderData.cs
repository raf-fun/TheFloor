namespace TheFloor.Model
{
    public class FolderData
    {
        public string? Path { get; set; }
        public string? Name { get; set; }
        public List<FileData> Files { get; set; } = [];
    }
}
