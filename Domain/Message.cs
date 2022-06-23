using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Message
    {
        public int? id { get; set; } // message's *unique* id
        public string? belongs { get; set; } // username of message sender
        public string? contactUsername { get; set; } // username of message's recipient
        public string? content { get; set; }
        public DateTime? created { get; set; }
        public bool? sent { get; set; }
        
    }
}
