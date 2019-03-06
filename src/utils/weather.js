const request = require('request');

var getWeather = (lat,lng,callback) => {
    request({
        url:`https://api.darksky.net/forecast/d668f62baf56b4fd764e7ab0aaff4eaa/${lat},${lng}`,
        json:true
    },(error,response,body) => {
        //console.log(JSON.stringify(response));
        if(error){
            callback(undefined,'Unable to connect to Forecast IO Servers');
        }else if(response.statusCode === 400){
            callback(undefined,'Unable to fetch weather');
        }else if(response.statusCode === 200){
            callback({
                temperature : body.currently.temperature,
                apparentTemperature:body.currently.apparentTemperature,
                summary:body.daily.data[0].summary
            });
        }     
    });
};

module.exports.getWeather = getWeather;