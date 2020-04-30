using DataStuff;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;

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

            var details = dataRetreval.GetCourseDetails();

            return Json(details, JsonRequestBehavior.AllowGet);
        }

        [System.Web.Http.HttpPost]
        public ActionResult WriteNewStudent([FromBody] StudentDetailsObject studentDetailsObject)
        {

            var dataAdd = new DataAdd();

            dataAdd.WriteNewStudent(studentDetailsObject);

            return null;
        }
    }
}