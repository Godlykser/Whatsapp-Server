using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WhatsappServer.Models;

namespace WhatsappServer.Data
{
    public class ReviewsContext : DbContext
    {
        public ReviewsContext (DbContextOptions<ReviewsContext> options)
            : base(options)
        {
        }

        public DbSet<WhatsappServer.Models.Review>? Review { get; set; }
    }
}
