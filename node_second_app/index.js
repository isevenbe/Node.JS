const express = require("express");
const bodyParser  = require("body-parser");
const app = express();

app.use(bodyParser.json());

require("./routes/userRoutes")(app);

const port = 2525;

app.listen(port, () => {
    console.log(`Server running`);
});

