/*
 * NodeJS code.
 */
 
// Required modules.
var express = require('express'),
    http = require('http'),
    formidable = require('formidable'),
    fs = require('fs');
    util = require('util');
    /*bodyParser= require('body-parser')*/
    /*path = require('path');*/


var app = express();
/*app.use(bodyParser.json());*/
 
// All your express server code goes here.
// ...
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Upload route.
app.post('/upload', function(req, res) {
    
    var form = new formidable.IncomingForm();


    form.parse(req, function(err, fields, files) {
        // `file` is the name of the <input> field of type `file`
        console.log(fields);
        console.log(files);
        console.log(util.inspect({fields: fields, files: files}));
        var old_path  = files.file_name.path,
            file_size = files.file_name.size,
            file_name = files.file_name.name,
            new_path  = __dirname + '/loads/' + file_name;
            
            fs.readFile(old_path, function(err, data) {
                fs.writeFile(new_path, data, function(err) {
                    fs.unlink(old_path, function(err) {
                    if(!err){
                        res.send({'success':true});
                    }else{
                        res.send({'success':false});
                    }
                });
            });
        });
    });

});

app.listen(8080);