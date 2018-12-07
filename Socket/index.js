const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http);
const port = 3000;


app.get('/', (req, res) => res.sendFile(`${__dirname}/front/index.html`));


var wm = new WeakMap();

io.sockets.on('connection', function (client) {

    client.on('data', function (somedata) {  
        wm.set(client, somedata);
        console.log('somedata :', client);
        console.log('somedata :', somedata);
    });   
    
    io.emit("data")
    
    client.on('disconnect', function() {
        wm.delete(client);
    });
    // //Send message when user connect from the chat
    // io.emit('newUser');

    //Send message you type into the inbox
    client.on('chat message', (msg) =>io.emit('chat message', msg));

    // //Send message when user disconnect from the chat
    // socket.on("disconnect", () => io.emit("disconnect"));
});


http.listen(port, () => console.log(`Listening on port ${port}`));
