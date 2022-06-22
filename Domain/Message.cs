using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Message
    {
        public int? id { get; set; } // message's id
        public string? sender { get; set; } // sender's username
        public string? recipient { get; set; } // receiver's username
        public string? content { get; set; }
        public DateTime? created { get; set; }
        public bool? sent { get; set; }
        
    }
}
