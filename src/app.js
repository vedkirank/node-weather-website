const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');
const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config

const publicDirPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

//set up handlebars and views location
app.set("views",viewsPath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);

//set up static directory to serve 
app.use(express.static(publicDirPath));
app.get('',(req,res) =>{
    res.render('index',{
        title:"Weather App",
        name:"Ved Kiran"
    });
});
app.get('/about',(req,res) => {
    res.render('about',{
        title:"About me",
        name:"Ved Kiran K"
    });
});
app.get('/help',(req,res) => {
    res.render('help',{
      title:"Help",
      name:"Ved Kiran"
    });
});
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
             error:'You must provide an address'
         });
     }
     geocode.geocodeAddress(encodeURIComponent(req.query.address),(errorMsg,addressResults) => {
        if(errorMsg){
            return res.send({
                error:errorMsg
            });
        }else{
            weather.getWeather(addressResults.latitude,addressResults.longitude,(weatherResults,errorMsg) => {
                if(errorMsg){
                    return res.send({
                        error:errorMsg
                    });
                    }else{
                        
                        res.send({
                            forecast:`Its currently ${weatherResults.temperature}.It feels like ${weatherResults.apparentTemperature}`,
                            location:addressResults.address,
                            address: req.query.address
                        });
                    }
        });
        }
    });


});
app.get('/products',(req,res) => {
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products:[]
    });
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title:"Help 404",
        errMsg : "Help article not found",
        name:"Ved Kiran"
    });
})
app.get('*',(req,res) => {
    res.render('404',{
        title:"404",
        errMsg : "Sorry,Page not found :)",
        name:"Ved Kiran"

    });
});

app.listen(port,() => {
    console.log('Server is up on port :'+port);
});