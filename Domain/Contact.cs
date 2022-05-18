namespace Domain
{
    public class Contact
    {
        public string? belongTo { get; set; } // the contact is in the contacts list of "belongTo"
        public string? id { get; set; } // contact id - his username
        public string? name { get; set; } // contact name - his nickname
        public string? server { get; set; }
        public string? last { get; set; }
        public DateTime? lastdate { get; set; }
    }
}