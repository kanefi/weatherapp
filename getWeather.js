const request = require ('request');
const {promisify} = require('util');

const promisifyRequest = promisify(request)

//
const getWeather = async (city, country) => {
    let data = await promisifyRequest({
        uri: `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=5d47ad2c0777176e3e380460e48b8009`,
        json: true
    });
        return data.body;
}



module.exports = getWeather;