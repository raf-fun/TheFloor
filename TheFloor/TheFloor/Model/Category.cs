namespace TheFloor.Model
{
    public class Category
    {
        public string? Name { get; set; }
        public List<FileData> Images { get; set; } = new List<FileData>();
        public string? BgColor { get; set; }
    }
}
