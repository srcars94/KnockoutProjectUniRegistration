$(function () {

    function viewModel() {

        //student registration
        this.firstName = ko.observable();
        this.surname = ko.observable();
        this.dob = ko.observable();

        this.courseId = ko.observable();
        this.courseList = ko.observableArray([]);
        this.courseValue = ko.observable();

        this.married = ko.observableArray(['Yes', 'No']);
        this.marriedValue = ko.observable();

        this.registerStudent = function () {
            registerStudent(this.firstName, this.surname, this.dob, this.courseValue, this.marriedValue);
        }

        //display student details
        this.displayFirstName = ko.observable();
        this.displaySurname = ko.observable();
        this.displayDoB = ko.observable();
        this.displayCourse = ko.observable();
        this.displayMarried = ko.observable();
        this.displayFullName = ko.observable()

        this.displayStudentDetailsList = ko.observableArray([]);

    };

    var vm = new viewModel();

    //student registrations

    function populateCoursesDropDown() {
        let url = "../../Home/GetCourseDetails";

        var temp = [];

        $.ajax({
            type: "GET",
            url: url,
            async: false,
            success: function (result) {
                for (i = 0; i < result.length; i++) {
                    temp.push(result[i].CourseName)

                    temp.map(function (item) {
                        return item['courseName'];
                    });
                }
            }
        });

        for (var i in temp) {   
            vm.courseList.push(temp[i]);
        }
    }

    function registerStudent(firstName, surname, dob, courseValue, married) {

        let url = "../../Home/WriteNewStudent";

        var marriedConvert = function(married) {
            if (married._latestValue.toLower() === "yes") {
                return true;
            } else {
                return false;
            }
        };

        var data = JSON.stringify({
            FirstName: firstName._latestValue,
            Surname: surname._latestValue,
            DoB: dob._latestValue,
            Course: courseValue._latestValue,
            Married: marriedConvert,
            FullName: (firstName._latestValue + " " + surname._latestValue)
        });

        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: function (data) { alert('data: ' + data); },
            contentType: "application/json",
            dataType: 'json'
        });
    }

    //display studnet details

    function getStudentDetais() {
        let url = "../../Home/GetStudentDetails";

        $.getJSON(url, {}, function (result) {
            for (i = 0; i < result.length; i++) {
                vm.displayStudentDetailsList.push({
                    displayFirstName: result[i].FirstName,
                    displaySurname: result[i].Surname,
                    displayDoB: moment(new Date(parseInt(result[i].DoB.replace('/Date(', '')))).format("DD/MM/YYYY"),
                    displayCourse: result[i].Course,
                    displayMarried: result[i].Married,
                    displayFullName: result[i].FullName
                });
            }
        });
    }
    
    populateCoursesDropDown();
    getStudentDetais();
    ko.applyBindings(vm);

});