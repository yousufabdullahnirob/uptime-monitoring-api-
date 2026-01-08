//dependecies:

const http = require("http");
const handler = require("./helpers/handlereqres");
const url = require("url");
const { StringDecoder } = require("string_decoder");
//app object :

const app = {};

app.config = {
    port: 3000,
};

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Server is running on port
             ${app.config.port}`);
    });
}

app.handleReqRes = handler.handleReqRes;

//start server 

app.createServer();
