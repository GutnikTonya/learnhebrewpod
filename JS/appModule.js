(function () {
    "use strict";

  console.log("Hello there again2")
    //Creating the main appModule
    var appModule = angular.module("appModule", ["ngRoute", "contactsListModule"]);

    //Creating first route configuration

    appModule.config(["$routeProvider", function ($routeProvider) {

        //Creating first route to [website] /index.html#/contactsList

        $routeProvider.when("/contactsList", {
            templateUrl: "html/contactsListView.html",
            controller: "ContactsListController",
            css: "CSS/site.css"

        });

        //Creating second route to [website] /index.html#/addContact

        $routeProvider.when("/addContact", {
            templateUrl: "html/addContactView.html",
            controller: "AddContactController",
            css: "CSS/site.css"

        });
        
        $routeProvider.otherwise({
            redirectTo: "/contactsList"
        });

    }]);


})();