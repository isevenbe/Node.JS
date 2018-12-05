const express = require("express");
const bodyParser  = require("body-parser");
var cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
require("./routes/userRoutes")(app);


app.listen(2525, () => {
    console.log(`Server running`);
});

