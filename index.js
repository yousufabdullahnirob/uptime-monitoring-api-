//dependecies:

const http = require("http");
const handler = require("./helpers/handlereqres");
const url = require("url");
const enviroment = require("./helpers/enviroments");
const { StringDecoder } = require("string_decoder");
const data = require("./lib/data");
//app object :

const app = {};

// testing data.read existence
if (typeof data.read === 'function') {
    data.read('test','newFile',(err, data)=>{
        console.log('this was the error',err, 'and this was the data', data);
    });
} else {
    console.log("CRITICAL ERROR: data.read is NOT a function. Keys:", Object.keys(data));
}


app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(enviroment.port, () => {
        console.log(`enviroment variable is ${process.env.NODE_ENV}`);

        console.log(`Server is running on port
             ${enviroment.port}`);
    });
}

app.handleReqRes = handler.handleReqRes;


//start server 

app.createServer();
