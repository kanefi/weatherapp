const hbs = require('express-handlebars');      // import handlebars
const path = require('path');               //import path
const bodyParser = require('body-parser');
const express = require('express');         //import express

const app = express();                      //declare express function/file as a variable

const getWeather = require('./lib/getWeather');      //import getWeather from lib folder

app.use(express.static(path.join(__dirname, 'public')));        //static with path, path.join joins us dirname and public, handlebars allows templates in
app.use(bodyParser.urlencoded({extended: false}));   
app.use(bodyParser.json());                                                             // directory name being pushed to public
app.engine('.hbs', hbs({                                        // 
    defaultLayout: 'layout',        
    extname: '.hbs'              
}));


//view engine setup
app.set('view engine', '.hbs');   //set views engine as hbs   like switching tv on or activating

//routing setup
app.get('/', async(req, res) => {                                                //set up a GET route at '/'            made console log wait for getWeather to run. otherwise index.js would run before getW and we would never get the data
    // let data = await getWeather();
    // console.log(data)
    // let temp = data.main.temp;
    // let windSpeed = data.wind.speed;

    // // let clouds = data.list[0]

// res.sendFile(__dirname + '/index.html');   
    res.render('index');
});

app.post('/', async(req, res) => {
    let city = req.body.city;
    let country = req.body.country;
    // let data = await getWeather(city, country);
    let data = await getWeather(city, country);

    console.log(data)

// I want to speak to getWeather... and pass it information from the post request.
// It's a function, which means I can pass it information.
// I could pass location to the getWeather()... *hint* both ends *hint*
// I think that 'back ticks' will be useful.

    
    let Country = data.sys.country;
    // let Sunrise = data.sys.sunrise;
    // let Sunset = data.sys.sunset;


    // let description = data.weather.description;

    res.render('index', {
        results: {
            Temperature:`${data.main.temp}c`,
            Windspeed: `${data.wind.speed}mph`,
            Country
            // Sunrise,
            // Sunset,
            //description;
            }
        })

})

app.listen(3000, () =>{                                                     //setup port for our application
    console.log('server listening on port 3000');
});


//EJS, Mustache template engines for JS