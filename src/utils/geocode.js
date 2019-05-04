const request = require('request');

var geocode = (location, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoiYXZpcmFsZnQ5IiwiYSI6ImNqdXFtaXE3ZTAzMWU0NG42eWpva2NvdmwifQ.99U39_-QfAWRm-OeOGxBGw&limit=1';

  request({url, json: true}, (error, { body }) => {
    var err;
    var res;

    if(error){
      err = 'unable to connect to the remote service.';
    } else if (body.features.length === 0) {
      err = 'unable to find location.';
    } else {
      res = {
        Latitute: body.features[0].center[1],
        Longitute: body.features[0].center[0],
        location: body.features[0].place_name
      }
    }

    callback(err, res);

  });

}
module.exports = geocode;
