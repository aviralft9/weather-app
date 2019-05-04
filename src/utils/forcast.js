const request = require('request');

var forcast = (Latitute, Longitute, callback) => {

  var url = 'https://api.darksky.net/forecast/c6b3310b02249b46a3118d07dfac20b6/' + Latitute + ',' + Longitute;

  request({url, json: true}, (error, {body}) => {

    var err;
    var res;

    if(error){
      err = 'unable to connect to the remote service.';
    }else if (body.error) {
      err = 'unable to find location.';
    }else {
      res = body.currently.summary + ', Hey its ' + body.currently.temperature + ' degrees out. There\'s ' + body.currently.precipProbability + ' chance of rain' + ' Wind speed: ' + body.currently.windSpeed + ' Humidity: ' + body.currently.humidity;
    }

    callback(err, res);

  });

}

module.exports = forcast;
