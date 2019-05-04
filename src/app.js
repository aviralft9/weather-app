const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

////Define paths for express config.
const viewsPath = path.join(__dirname, '../templates/views');
const PathToRootDirectory = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');


////Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

/////Setup static directory to serve
app.use(express.static(PathToRootDirectory));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Aviral Sachdeo'
  });
});


app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Weather App',
    name: 'Aviral Sachdeo'
  });
});


app.get('/help', (req, res) => {
  res.render('help', {
    message: 'We cant help you bro...',
    title: 'help page',
    name: 'Aviral Sachdeo'
  });
});


// app.get('', (req, res) => {
//   res.send('<h1>hello express</h1>');
// });

// app.get('/help', (req, res) => {
//     res.send([
//       {name: "aviral", age: 22},
//       {name: 'nobody', age: 100}
//     ]);
// });
//
// app.get('/about', (req, res) => {
//   res.send('<h1>about page init motherfucker</h1>');
// });
//

app.get('/weather', (req, res) => {

  if(!req.query.address){
    return res.send({
      error: 'You must provide an address.'
    });
  }

  geocode(req.query.address, (error, { Latitute, Longitute, location} = {}) => {

    if(error){
        return res.send({error: error});
    }

    forcast(Latitute, Longitute, (error, forecastData) => {
      if(error){
        return res.send({error: error});
      }
      res.send({
        location: location,
        forecast: forecastData,
        address: req.query.address
      });
    });

  });

});


app.get('/help/*', (req, res) => {
  res.render('error' ,{
    title: '404 error',
    name: 'Aviral Sachdeo',
    message: 'Help article not found..'
  });
});

app.get('*', (req, res) => {
  res.render('error' ,{
    title: '404 error',
    name: 'Aviral Sachdeo',
    message: 'Page not found...'
  });
});

app.listen(3000, () =>{
  console.log('listening init!!');
});
