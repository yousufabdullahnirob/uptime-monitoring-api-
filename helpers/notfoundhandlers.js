

//models scaffolding
const notFoundHandler = {};

notFoundHandler.handle = (requestProperties, callback) => {
    callback(404, {
        message: 'Your requested URL was not found!',
    });
}
module.exports = notFoundHandler;