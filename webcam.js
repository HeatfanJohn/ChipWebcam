/**
 * Autor: John P. Masseria (john@masseria.org)
 */

// Limit concurrent camera access 
var sem = require('semaphore')(1);
var uuid = require('uuid');

var port = 8080;
var 
    app = require('http').createServer(handler).listen(port, "0.0.0.0"),
    path = require('path'),
    fs = require('fs'),
    sys = require('util'),
    exec = require('child_process').exec,
    child, child1;

function handler(req, res) {
    var
        fileName = path.basename(req.url) || 'index.html',
        ext = path.extname(fileName),
        localFolder = __dirname + '/',
        //localFolder = __dirname + '/public/',
        page404 = localFolder + '404.html';
 
    //do we support the requested file type?
    if(!extensions[ext]){
        //for now just send a 404 and a short message
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("<html><head></head><body>The requested file type is not supported</body></html>");
    };

    if( fileName.toLowerCase() == 'snap.jpg' ) {
        sem.take(function() {
            var fname = uuid.v4(); // Get a random filename
            child = exec('../uvccapture/uvccapture -o/tmp/' + fname + ' -x640 -y480 -j5 -m -c./decorate.sh', function (error, stdout, stderr) {
                if (error !== null) {
                    console.log('kernel exec error: ' + error);
                } else {
                    getFile(('/tmp/' + fname + '.jpg'), res, page404, extensions[ext]);
                }; 
                child = exec('rm /tmp/' + fname + '*', function (error, stdout, stderr) {
                    if (error !== null)
                        console.log('rm error: ' + error);
                    sem.leave();
                });
            });
        });
    } else { 
        //call our helper function
        //pass in the path to the file we want,
        //the response object, and the 404 page path
        //in case the requestd file is not found
        getFile((localFolder + fileName), res, page404, extensions[ext]);
    };
};

//these are the only file types we will support
extensions = {
    ".html": "text/html",
    ".css" : "text/css",
    ".js"  : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg",
    ".ico" : "image/x-icon"
};
 
//helper function handles file verification
function getFile(filePath, res, page404, mimeType){
    //does the requested file exist?
    fs.exists(filePath, function(exists){
        if(exists){
            //read the fiule, run the anonymous function
            fs.readFile(filePath, function(err,contents){
                if(!err){
                    //send the contents with the default 200/ok header
                    res.writeHead(200,{
                        "Content-type" : mimeType,
                        "Content-Length" : contents.length
                    });
                    res.end(contents);
                } else
                    console.dir('getFile: ' + err);  //for our own troubleshooting
            });
        } else {
            //if the requested file was not found serve-up our custom 404 page
            fs.readFile(page404, function(err,contents){
                if(!err){
                    //send the contents with a 404/not found header 
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else
                    console.dir('getFile: ' + err);  //for our own troubleshooting
            });
        };
    });
};
 
// listen for an HTTP request on port specified 
app.listen(port);
