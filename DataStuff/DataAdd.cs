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

        public void UpdateExistingStudent(StudentDetailsObject student)
        {
            var existingStudent = context.StudentDetails.Where(w => w.Id == student.Id).SingleOrDefault();

            existingStudent.FirstName = student.FirstName;
            existingStudent.Surname = student.Surname;
            existingStudent.DoB = student.DoB;
            existingStudent.Course = student.Course;
            existingStudent.Married = student.Married;
            existingStudent.FullName = student.FullName;
           
           // context.StudentDetails.(newStudent);

            try
            {
                context.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception();
            }

        }
    }
}
