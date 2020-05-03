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
    };

    function listStudentsViewModel() {
        //display student details

        var self = this;

        this.displayFirstName = ko.observable();
        this.displaySurname = ko.observable();
        this.displayDoB = ko.observable();
        this.displayCourse = ko.observable();
        this.displayMarried = ko.observable();
        this.displayFullName = ko.observable();
        this.displayStudentId = ko.observable();

        this.displayStudentDetailsList = ko.observableArray([]);

        this.courseInfo = function (data, clicked) {
            courseInfo(data, clicked);
        }

        this.editUser = function (data, clicked) {
            editUser(data, clicked);
        }
    }

    function courseInformationViewModel() {
        this.courseTitle = ko.observable();
        this.courseDescription = ko.observable();
    }

    function editStudentViewModel() {
        this.editFirstName = ko.observable();
        this.editSurname = ko.observable();
        this.editDoB = ko.observable();

        this.editMarried = ko.observable();
        this.editMarriedDropDown = ko.observable(['Yes', 'No']);
        this.editCurrentMarriedStatus = ko.observable();

        this.editStudentId = ko.observable();

        this.editCourse = ko.observable();
        this.editCourseList = ko.observableArray([]);
        this.editCurrentUserCourse = ko.observable();

        this.editFullName = ko.observable();
        this.changeFullName = function () {
            changeFullName(this.editFirstName, this.editSurname);
        }

        this.submitEditedStudent = function () {
            submitEditedStudent(this.editFirstName, this.editSurname, this.editDoB, this.editCourse, this.editCurrentUserCourse, this.editMarried, this.editStudentId, this.editCurrentMarriedStatus)
        }
    }

    var studentRegistrationVm = new viewModel();
    var studentListVm = new listStudentsViewModel();
    var courseInformationVm = new courseInformationViewModel();
    var editStudentVm = new editStudentViewModel();

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
            studentRegistrationVm.courseList.push(temp[i]);
        }
    }

    function registerStudent(firstName, surname, dob, courseValue, married) {

        let url = "../../Home/WriteNewStudent";

        var marriedConvert = function (married) {
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
            contentType: "application/json",
            dataType: 'json',
            success: function () {
                window.location.reload();;
            }

        });
    }

    //display studnet details

    function getStudentDetais() {
        let url = "../../Home/GetStudentDetails";

        $.getJSON(url, {}, function (result) {
            for (i = 0; i < result.length; i++) {
                studentListVm.displayStudentDetailsList.push({
                    displayFirstName: result[i].FirstName,
                    displaySurname: result[i].Surname,
                    displayDoB: moment(new Date(parseInt(result[i].DoB.replace('/Date(', '')))).format("DD/MM/YYYY"),
                    displayCourse: result[i].Course,
                    displayMarried: result[i].Married == false ? "No" : "Yes",
                    displayFullName: result[i].FullName,
                    displayStudentId: result[i].Id
                });
            }
        });
    }

    //modals

    function courseInfo(data, clicked) {

        let url = "../../Home/GetCourseDetailsInfo";

        $.ajax({
            type: "GET",
            url: url,
            async: false,
            dataType: 'json',
            data: { 'courseName': data.displayCourse, 'courseDetails': '' },
            success: function (result) {
                courseInformationVm.courseTitle(result[0].courseName);
                courseInformationVm.courseDescription(result[0].courseDetails);
            }
        });

        $('#courseInfoModal').modal('show');

        if (clicked == "clicked") {
            ko.applyBindings(courseInformationVm, document.getElementById('courseInfoModal'))
        }
    }

    function editUser(data, clicked) {

        let url = "../../Home/GetStudentDetailsForSpecificStudent";

        var jsonBoi = JSON.stringify({
            FirstName: "",
            Surname: "",
            DoB: "",
            Course: "",
            Married: "",
            FullName: "",
            Id: data.displayStudentId
        });

        var epochDate;

        $.ajax({
            type: "POST",
            url: url,
            async: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: jsonBoi,
            success: function (result) {
                editStudentVm.editFirstName(result[0].FirstName);
                editStudentVm.editSurname(result[0].Surname);
                //editStudentVm.editDoB(moment(new Date(parseInt(result[0].DoB.replace('/Date(', '')))).format("DD/MM/YYYY"));
                epochDate = result[0].DoB.replace('/Date(', '').replace(')/','');
                editStudentVm.editCurrentUserCourse(result[0].Course);
                editStudentVm.editMarried(result[0].Married == false ? "No" : "Yes");
                editStudentVm.editStudentId(result[0].Id);
                editStudentVm.editFullName(result[0].FullName);
            }
        });


        //have to add on one extra day manually because js uses ms not secs 
        var calculateCorrectEpochDate = (parseInt(epochDate) + (1000 * 60 * 60 * 24));
        
        document.getElementById("dateOfBirth").valueAsDate = new Date(calculateCorrectEpochDate);


        editCourseListDisplay(editStudentVm.editCurrentUserCourse._latestValue);

        $('#editStudentModal').modal('show');

        if (clicked == "clicked") {
            ko.applyBindings(editStudentVm, document.getElementById('editStudentModal'));
        }
    }

    function editCourseListDisplay(currentUserCourse) {

        let url = "../../Home/GetCourseDetails";

        editStudentVm.editCourseList([]);

        var temp = [];
        var uniqueNames = [];

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

       
        //remove duplicates
        $.each(temp, function (i, el) {
            if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        });

        //remove duplicated matching to place holder
        var removeMatching = uniqueNames.indexOf(currentUserCourse);

        if (removeMatching > -1) {
            uniqueNames.splice(removeMatching, 1);
        }

        for (var i in uniqueNames) {
            editStudentVm.editCourseList.push(uniqueNames[i]);
        }
    }

    function changeFullName(firstName, surname) {
        editStudentVm.editFullName(firstName._latestValue + " " + surname._latestValue);

    }

    function submitEditedStudent(firstName, surname, dob, editCourse, editCurrentUserCourse, married, studentId, editCurrentMarriedStatus) {
        let url = "../../Home/UpdateExistingStudent";

        var marriedConvert = function (editCurrentMarriedStatus._latestValue) {
            if (editCurrentMarriedStatus._latestValue.toLower() === "yes") {
                return true;
            } else {
                return false;
            }
        };

        var data = JSON.stringify({
            FirstName: firstName._latestValue,
            Surname: surname._latestValue,
            DoB: dob._latestValue,
            Course: editCourse._latestValue == undefined ? editCurrentUserCourse._latestValue : editCourse._latestValue,
            Married: marriedConvert,
            FullName: (firstName._latestValue + " " + surname._latestValue),
            Id: studentId._latestValue
        });
        
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            contentType: "application/json",
            dataType: 'json',
            success: function () {
                window.location.reload();;
            }

        });
    }

    populateCoursesDropDown();
    getStudentDetais();
    ko.applyBindings(studentRegistrationVm, document.getElementById('studnetRegistration'));
    ko.applyBindings(studentListVm, document.getElementById('studentList'));

});