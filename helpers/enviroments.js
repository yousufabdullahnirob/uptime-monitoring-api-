const enviroment = {};
enviroment.staging = {
    port : 3000,
    envName : 'staging'
};
enviroment.production = {
    port : 5000,
    envName : 'production'
};

//determine which env was passed 

const currentEnviroment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLowerCase() : 'staging';

const enviromentToExport = typeof enviroment[currentEnviroment] === 'object' ? enviroment[currentEnviroment] : enviroment.staging;

module.exports = enviromentToExport;

