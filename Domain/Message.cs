using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Message
    {
        public int? id { get; set; }
        public string? belongs { get; set; }
        public string? contactUsername { get; set; }
        public string? content { get; set; }
        public DateTime? created { get; set; }
        public bool? sent { get; set; }
        
    }
}
