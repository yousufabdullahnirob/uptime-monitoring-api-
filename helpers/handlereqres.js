//module scaffolding 
const url = require("url");
const { StringDecoder } = require("string_decoder"); 
const routes = require("../routes");
const notFoundHandler = require("../helpers/notfoundhandlers");
const handler = {}

const responseProperties = {}
handler.handleReqRes = (request, response) => {

    const parsedUrl = url.parse(request.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = request.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = request.headers;
    const decoder = new StringDecoder('utf-8');
    
    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler.handle;

    let realData = '';

    request.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    request.on('end', () => {
        realData += decoder.end();
        
        requestProperties.body = realData;

        console.log('Request received:', method, trimmedPath);

        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 200;
            payload = typeof payload === 'object' ? payload : {};
            
            const payloadString = JSON.stringify(payload);
            
            response.writeHead(statusCode);
            response.end(payloadString);
        });
    });
}
module.exports = handler;