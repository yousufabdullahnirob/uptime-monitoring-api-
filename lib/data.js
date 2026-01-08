const fs = require("fs");
const path = require("path");
const lib = {};
const dir = './.data';

lib.basedir = path.join(__dirname,'../.data');

lib.create = function(dir, file, data, callback){
    // Open the file for writing
    const fileName = path.join(lib.basedir, dir, file + '.json');
    
    fs.open(fileName, "wx", (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if (!err) {
                    fs.close(fileDescriptor, (err) => {
                        if (!err) {
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });
        } else {
            callback('Could not create new file, it may already exist. Error: ' + err);
        }
    });
}

lib.read = function(dir, file, callback){
    fs.readFile(path.join(lib.basedir, dir, file + '.json'), 'utf8', (err, data) => {
        callback(err, data);
    });

}
//update existing file:
lib.update = function(dir, file, data, callback)
{
    fs.open(path.join(lib.basedir, dir, file + '.json'), 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if (!err) {
                    fs.close(fileDescriptor, (err) => {
                        if (!err) {
                            callback(false);
                        } else {
                            callback('Error closing file');
                        }
                    });
                } else {
                    callback('Error writing to file');
                }
            });
        } else {
            callback('Could not open file for updating, it may not exist. Error: ' + err);
        }
    });
}
//delete existing file:
lib.delete = function(dir, file, callback)
{
    fs.unlink(path.join(lib.basedir, dir, file + '.json'), (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('Error deleting file');
        }
    });
}
module.exports = lib;