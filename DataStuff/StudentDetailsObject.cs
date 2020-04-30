using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStuff
{
    public class StudentDetailsObject
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Course { get; set; }
        public DateTime DoB { get; set; }
        public bool Married { get; set; }
        public string FullName { get; set; }
    }
}
