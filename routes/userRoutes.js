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

            content.push({ id, studentName, pastWatch, nextWatch, pastWatchSubject, watchSubject });

            console.log("added " + studentName + " to DB");

            jsonfile.writeFile(file_path, content, function (err) {
                console.log(err);
            });

            res.sendStatus(200);
        });
    });

    app.put("/watch", (req, res) => {
        let user;
        let id = req.query.id;
        let studentName = req.query.studentName;
        let nextWatch = req.body.nextWatch;
        let watchSubject = req.body.watchSubject;

        jsonfile.readFile(file_path, function (err, content) {
            for (var i = content.length - 1; i >= 0; i--) {
                if (content[i].id === id) {
                    console.log("updated user " + studentName + " has now username : ");

                    user = content[i];
                    user.nextWatch = nextWatch;
                    user.pastWatch.push(nextWatch);
                    user.watchSubject = watchSubject;
                    user.pastWatchSubject.push(watchSubject);
                }
            }

            jsonfile.writeFile(file_path, content, function (err) {
                console.log(err);
            });
        });
        res.send(user);
    });


    app.delete("/watch", (req, res) => {

        let id = req.query.id;

        jsonfile.readFile(file_path, function (err, content) {

            for (var i = content.length - 1; i >= 0; i--) {

                if (content[i].id == id) {
                    console.log("removing " + content[i].id + "from DB");
                    content.splice(i, 1);
                }

            }

            jsonfile.writeFile(file_path, content, function (err) {
                console.log(err);
            });

            res.sendStatus(200);
        });
    });

    

}