using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Message
    {
        public int? id { get; set; } // message id
        public string? belongs { get; set; } // message belongs to the owner of contact list
        public string? contactUsername { get; set; } // this message is between the owner and a contact
        public string? content { get; set; }
        public DateTime? created { get; set; }
        public bool? sent { get; set; }
        
    }
}
