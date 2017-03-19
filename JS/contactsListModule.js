(function () {

    "use stricts";

    // Creating the Module (contactsListModule): 
    var contactsList = angular.module("contactsListModule", []);

    // Creating the Controller for The List Contact Page: 
    contactsList.controller("ContactsListController", ["$scope", "$http", function ($scope, $http) {


        $(document).ready(function () {

            //Get the list from server
            $http.get("/contacts")
            .then(function mySuccess(response) {
                $scope.arrContactList = response.data;



            }, function myError(response) {
                console.log(response.statusText);
            });



            $("#addContact").click(function () {

                window.open("#!/addContact", "_self");

            });


        });

    }]);





    // Creating the Controller for The Add new contact Page: 
    contactsList.controller("AddContactController", ["$scope", "$http", function ($scope, $http) {





        $(document).ready(function () {







            $("form").submit(function () {

                //get the value from the end user
                var newContactFullName = $('#name').val();
                var newContactEmail = $('#email').val();

                //checking if array exists in server, if not creating the array
                var arrContactList = [];
                var indexContactExists = null;
                $http.get("/contacts")
           .then(function mySuccess(response) {
               arrContactList = response.data;

               if (arrContactList == null) {
                   arrContactList = [];



               }
               else {

                   //checking if the user Full Name already exists,asking if to replace
                   for (var i = 0; i < arrContactList.length; i++) {

                       if (newContactFullName == arrContactList[i].fullName) {

                           $("#warningMessage").text("The name " + arrContactList[i].fullName + " already exists. Overwrite?");

                           $("#myModal").modal("show");

                           indexContactExists = arrContactList[i];
                           break;

                       }

                   }

               }


               $("#yes").click(function () {



                   $http.patch('/contact', { 'email': newContactEmail, 'index': i })
                  .then(
                      function (response) {
                          console.log(response);
                          $("#myModal").modal("hide");
                          setTimeout(function () { window.open("#!/contactsList", "_self"); }, 500);

                          
                      },
                      function (response) {
                          console.log(response);
                          $("#myModal").modal("hide");
                      }
                   );




                   

               });

               $("#no").click(function () {

                   $("#myModal").modal("hide");


               });




               if (indexContactExists == null) {


                   $http.post('/contact', { 'fullName': newContactFullName, 'email': newContactEmail })
               .then(
                   function (response) {
                       console.log(response);
                       window.open("#!/contactsList", "_self");
                   },
                   function (response) {
                       console.log(response);
                   }
                );





               }


           }, function myError(response) {
               console.log(response.statusText);
           });





            });

        });

        $("#home").click(function () {

            window.open("#!/contactsList", "_self");

        });












    }]);





})();