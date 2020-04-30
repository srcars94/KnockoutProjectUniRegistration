using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStuff
{
    public class DataRetreval
    {
        private readonly UniversityContext context = new UniversityContext();

        public List<StudentDetailsObject> GetStudentDetails()
        {
            var details = context.StudentDetails.Select(s => new StudentDetailsObject
            {
                Id = s.Id,
                FirstName = s.FirstName,
                Surname = s.Surname,
                Course = s.Course,
                DoB = s.DoB,
                Married = s.Married,
                FullName = s.FullName
            }).ToList();

            return details;
        }

        public List<CoursesObject> GetCourseDetails()
        {
            var details = context.Courses.Select(s => new CoursesObject
            {
                CourseId = s.CourseId,
                CourseDetails = s.CourseDetails,
                CourseName = s.CourseName
            }).OrderBy(o => o.CourseName).ToList();

            return details;
        }
    }
}
