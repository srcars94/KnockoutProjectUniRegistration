using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStuff
{
    public class UniversityContext : DbContext
    {
        public UniversityContext() : base("UniversityContext") { }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //    modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        //}

        public DbSet<Courses> Courses { get; set; }
        public DbSet<StudentDetails> StudentDetails { get; set; }
    }
}
