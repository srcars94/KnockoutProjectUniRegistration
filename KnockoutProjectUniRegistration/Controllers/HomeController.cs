using DataStuff;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using System.Net;

namespace KnockoutProjectUniRegistration.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult GetStudentDetails()
        {
            var dataRetreval = new DataRetreval();

            var details = dataRetreval.GetStudentDetails();

            return Json(details, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetCourseDetails()
        {
            var dataRetreval = new DataRetreval();

            var details = dataRetreval.GetCourseDetailsInfo();

            return Json(details, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetCourseDetailsInfo(string courseName, string courseDetails)
        {
            var dataRetreval = new DataRetreval();

            var details = dataRetreval.GetCourseDetails(courseName);

            return Json(details.Select(s => new { courseName = s.CourseName, courseDetails = s.CourseDetails }), JsonRequestBehavior.AllowGet);
        }

        [System.Web.Http.HttpPost]
        public ActionResult WriteNewStudent([FromBody] StudentDetailsObject studentDetailsObject)
        {

            var dataAdd = new DataAdd();

            dataAdd.WriteNewStudent(studentDetailsObject);

            return Json(new { success = true}, JsonRequestBehavior.AllowGet);
        }

        [System.Web.Http.HttpPost]
        public ActionResult GetStudentDetailsForSpecificStudent([FromBody]StudentDetailsObject studentDetailsObject)
        {
            var dataRetreval = new DataRetreval();

            var details = dataRetreval.GetStudentDetailsForSpecificStudent(studentDetailsObject);

            return Json(details, JsonRequestBehavior.AllowGet);
        }

        [System.Web.Http.HttpPost]
        public ActionResult UpdateExistingStudent([FromBody] StudentDetailsObject studentDetailsObject)
        {

            var dataAdd = new DataAdd();

            dataAdd.UpdateExistingStudent(studentDetailsObject);

            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}