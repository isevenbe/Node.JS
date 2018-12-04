var jsonfile = require('jsonfile')

var file = './tmp/data.json';
const file_path = "./DB/users.json";

var obj = { name: 'JP' }

jsonfile.writeFile(file, obj, function (err) {
    console.error(err)
})
jsonfile.readFile(file, function (err, obj) {
    console.dir(obj)

})

module.exports = function (app) {
    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

    app.get("/students", (req, res) => {
        console.log("fetching all users");

        // jsonfile reading
        jsonfile.readFile("./DB/users.json", function (err, content) {
            // send file contents back to sender
            res.send(content);
        });
    });

    app.post("/students/new", (req, res) => {

        let { studentName, pastWatch, nextWatch, pastWatchSubject, watchSubject } = req.body;

        jsonfile.readFile(file_path, function (err, content) {

            content.push({ studentName, pastWatch, nextWatch, pastWatchSubject, watchSubject });

            console.log("added " + studentName + " to DB");

            jsonfile.writeFile(file_path, content, function (err) {
                console.log(err);
            });

            res.sendStatus(200);
        });
    });

    app.put("/student", (req, res) => {
        let user;
        let studentName = req.query.studentName;
        let nextWatch = req.body.nextWatch;
        let watchSubject = req.body.watchSubject;

        jsonfile.readFile(file_path, function (err, content) {
                for (var i = content.length - 1; i >= 0; i--) {
                    if (content[i].studentName === studentName) {
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

    app.delete("/students/destroy", (req, res) => {
        let studentName = req.body.studentName;
        jsonfile.readFile(file_path, function (err, content) {
            for (let i = content.length - 1; i >= 0; i--) {
                if (content[i].studentName === studentName) {
                    console.log("removing " + content[i].studentName + " from DB");
                    content.pop(i);
                }
            }
            jsonfile.writeFile(file_path, content, function (err) {
                console.log(err);
            });
            res.sendStatus(200);
        })
    });


    app.get("user", (res, req) => {
        let user;
        let studentName = req.query.studentName;
        jsonfile.readFile(file_path, function(err, content){
            for (let i = content.length -1 ; i >= 0; i--) {
                if (content[i].studentName === studentName){
                    console.log("found user " + content[i]);
                    console.log(content[i]);
                    user = content[i];
                }
            }
            res.send(user);
        })
    })

}