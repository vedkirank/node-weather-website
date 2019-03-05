const request = require('request');

// Forecast IO API Key - d668f62baf56b4fd764e7ab0aaff4eaa

var geocodeAddress = (address,callback) => {
    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAYAgvMVFACih2cCWM7jCnhDlwUnhosq4s`,
        json:true
    },(error,response,body) => {
        if(error){
            callback('Unable to connect to Google Servers');
        }else if(body.status === 'ZERO_RESULTS'){
            callback('Unable to find this address');
        }else if(body.status === 'OK'){
            callback(undefined,{
                address:body.results[0].formatted_address,
                latitude:body.results[0].geometry.location.lat,
                longitude:body.results[0].geometry.location.lng
            });
        }     
    });
}
module.exports = {
    geocodeAddress
};