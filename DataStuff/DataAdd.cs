using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStuff
{
    public class DataAdd
    {
        private readonly UniversityContext context = new UniversityContext();

        public void WriteNewStudent(StudentDetailsObject student)
        {
            var newStudent = new StudentDetails
            {
                FirstName = student.FirstName,
                Surname = student.Surname,
                DoB = student.DoB,
                Course = student.Course,
                Married = student.Married,
                FullName = student.FullName
            };

            context.StudentDetails.Add(newStudent);

            try
            {
                context.SaveChanges();
            }catch(Exception e)
            {
                throw new Exception();
            }
        }
    }
}
