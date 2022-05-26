using Domain;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class Context : DbContext
    {
        private const string connectionString = "server=localhost;port=3306;database=whatsappDB;user=root;password=157221";

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(connectionString, MariaDbServerVersion.AutoDetect(connectionString));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>()
                .HasKey(nameof(Contact.belongTo), nameof(Contact.id));

            modelBuilder.Entity<Message>()
                .HasKey(nameof(Message.id));

            modelBuilder.Entity<User>().HasKey(nameof(User.username));
        }

        public Context()
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public DbSet<Contact> Contacts { get; set; }

        public DbSet<Message> Messages { get; set; }

        public DbSet<User> Users { get; set; }

    }
}