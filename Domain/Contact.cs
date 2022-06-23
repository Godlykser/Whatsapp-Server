namespace Domain
{
    public class Contact
    {
        public string? belongTo { get; set; } // username of user who owns this contact
        public string? id { get; set; } // contact's username
        public string? name { get; set; } // contact's nickname
        public string? server { get; set; }
        public string? last { get; set; }
        public DateTime? lastdate { get; set; } // last message date
    }
}