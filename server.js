// Need to: 
// npm install body-parser

var express = require("express");
var fs = require("fs");

var app = express();

// Need to extract the body data into the request.body:
var bodyParser = require("body-parser"); // Create variable.
app.use(bodyParser.urlencoded({ extended: true })); // Extract body.
app.use(bodyParser.json()); // Use it only on JSON

app.use(express.static(__dirname));




//get all data from json
app.get("/contacts", function (request, response) {

    var fileData = fs.readFileSync("./contacts.json", "utf-8");
    response.send(JSON.parse(fileData));

});




//add new contact to json
app.post("/contact", function (request, response) {

    console.log(request.body);

    var fileData = fs.readFileSync("./contacts.json", "utf-8");
    var arr = JSON.parse(fileData);

    var newContact = {
        fullName: request.body.fullName,
        email: request.body.email
        
    };

    arr.push(newContact);

    fs.writeFileSync("./contacts.json", JSON.stringify(arr));

    response.send(newContact);
});





//update exist contact
app.patch("/contact", function (request, response) {
    var fileData = fs.readFileSync("./contacts.json", "utf-8");
    var arr = JSON.parse(fileData);
    var obj = null;
    
    var index=request.body.index;        
    arr[index].email = request.body.email;
    obj = arr[index];
           
    
    fs.writeFileSync("./contacts.json", JSON.stringify(arr));
    response.send(obj);
});



app.listen(3000, function () {
    console.log("Listening on: http://localhost:3000");
});











