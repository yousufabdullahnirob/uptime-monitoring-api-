//routes :
const sampleHandler = require("./routehandlers/samplehandlers");

const routes = {
    sample : sampleHandler.handle
}
module.exports = routes;
