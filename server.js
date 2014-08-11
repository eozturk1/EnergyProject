var http = require("http"),
url = require("url"),
path = require("path"),
fs = require("fs")
port = process.argv[2] || 8080;

var qs = require("querystring");

var db = require("./database/database");

var models = require("./database/models");
var User = models.UserModel;

http.createServer(function(request, response) {

    if (request.method == "GET") {
        console.log("Request method: GET");
        var uri = url.parse(request.url).pathname
        , filename = path.join(process.cwd(), uri);

        var contentTypesByExtension = {
            '.html': "text/html",
            '.css':  "text/css",
            '.js':   "text/javascript",
            '.csv':  "text/plain"
        };

        fs.exists(filename, function(exists) {
            if(!exists) {
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write("404 Not Found\n");
                console.log("Couldn't file requested file " + filename);
                response.end();
                return;
            }

            console.log("Requested file: " + filename);

            if (filename == __dirname + '/') {  // not looking for a specific file, redirect to index.html
                console.log('trying to reach the main page. redirect to login.html');
                filename += 'login.html';
            }

            console.log("Responsing with the file: " + filename);

            fs.readFile(filename, "binary", function(err, file) {
                if(err) {        
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();
                    return;
                }

                var headers = {};
                var contentType = contentTypesByExtension[path.extname(filename)];
                if (contentType) headers["Content-Type"] = contentType;
                response.writeHead(200, headers);
                response.write(file, "binary");
                response.end();
            });
        });
    } else if (request.method == "POST") {
        console.log("Request method: POST");
        var requestBody = '';
        request.on('data', function(data) {
            requestBody += data;
            if(requestBody.length > 1e7) {
                response.writeHead(413, "Request Entity Too Large", {'Content-Type': 'text/html'});
                response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
            }
        });

        request.on('end', function (){
            var formData = qs.parse(requestBody);
            console.log(formData);
            if (formData.username != undefined && formData.password != undefined) { // post for login.
                console.log("Login request received.");
                var mainPage = "index.html";
                User.findOne({username: formData.username}, function (err, user) {
                    if (err) {
                        return console.error(err);
                    }
                    if (user == null) { // couldn't find the user.
                        console.log("Login failed. Wrong username or password.");
                        response.writeHead(500, {"Content-Type": "text/plain"});
                        response.write("Login failed. Wrong username or password.");
                        response.end();
                        return;
                    }
                    /* user is registered, check if the passwords match. if matches, redirect to main page. */
                    if (user.password == formData.password) {
                        console.log("Login successful. Redirecting to " + mainPage);
                        fs.readFile(mainPage, "binary", function(err, file) {
                            if(err) {        
                                response.writeHead(500, {"Content-Type": "text/plain"});
                                response.write(err + "\n");
                                response.end();
                                return;
                            }

                            response.writeHead(200, {"Content-Type": "text/html"});
                            response.write(file, "binary");
                            response.end();
                        });
                    } else {
                        console.log("Login failed. Wrong username or password.");
                        response.writeHead(500, {"Content-Type": "text/plain"});
                        response.write("Login failed. Wrong username or password.");
                        response.end();
                        return;
                    }
                });
            }
        });
    }
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");