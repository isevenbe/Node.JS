const jsonfile = require('jsonfile');
const uuidv4 = require('uuid/v4');
const file_path = "./DB/users.json";

module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
    });

    app.get("/watch", (req, res) => {
        let user;
        let id = req.query.id;
        
        jsonfile.readFile(file_path, function (err, content) {
            if (!req.query.id){
                res.send(content);
            } else {
                for (var i = content.length - 1; i >= 0; i--) {
                    if (content[i].id === id) {
                        console.log("found user" + content[i]);
                        user = content[i];
                    }
                }
    
                res.send(user);
            }
            
        });
    });

    app.post("/watch", (req, res) => {

        let { id, studentName, pastWatch, nextWatch, pastWatchSubject, watchSubject } = req.body;

        jsonfile.readFile(file_path, function (err, content) {
            pastWatch = new Array();
            pastWatchSubject = new Array();
            nextWatch = "";
            watchSubject = "";
            id = uuidv4();
            if (studentName != undefined) {
                content.push({ id, studentName, pastWatch, nextWatch, pastWatchSubject, watchSubject });
                console.log(`${studentName} as added to DataBase`);
            } else {
                // res.send({ERROR : `ERROR ! Make sure studentName into body`});
            }

            jsonfile.writeFile(file_path, content, function (err) {
                console.log(err);
            });
            res.send({ADDED : `${studentName} as added to DataBase`});
        });
    });

    app.put("/watch", (req, res) => {
        let user;
        let id = req.query.id;
        let studentName = req.body.studentName;
        let nextWatch = req.body.nextWatch;
        let watchSubject = req.body.watchSubject;

        jsonfile.readFile(file_path, function (err, content) {
            for (var i = content.length - 1; i >= 0; i--) {
                if (content[i].id === id) {
                    user = content[i];
                    if (user.nextWatch != null && user.watchSubject != null && user.studentName != null){
                        user.studentName = studentName;
                        user.nextWatch = nextWatch;
                        user.pastWatch.push(nextWatch);
                        user.watchSubject = watchSubject;
                        user.pastWatchSubject.push(watchSubject);
                        res.send(user);
                        console.log(`${user.studentName} Added to DataBase`);
                    } else {
                        res.send({ERROR: `FILL ALL THE BODY REQUIRE IS : studentName, nextWatch, pastWatch`});
                        
                    }
                    
                }
                // res.send(user);
            }

            jsonfile.writeFile(file_path, content, function (err) {
                console.log(`look like some put is ${err} on ${id}`);
            });
        // res.send(user);

        });
    });


    app.delete("/watch", (req, res) => {

        let id = req.query.id;

        jsonfile.readFile(file_path, function (err, content) {

            for (var i = content.length - 1; i >= 0; i--) {

                if (content[i].id == id) {
                    content.splice(i, 1);
                    res.send(`${id} as been removed from DataBase`);
                    console.log(`${id} as been removed from DataBase`);
                }

            }

            jsonfile.writeFile(file_path, content, function (err) {
                console.log(err);
            });
        });
    });

    

}