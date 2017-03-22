/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.highmoorGET = function highmoorGET (req, response) {



	var http = require('http');

	http.request('http://opendata.reading-travelinfo.co.uk/api/1/bus/calls/039026320003.json?key=d0205bef-ef50-4c47-8921-34c352a61276', function(res) {
	  var payload = '';
	  res.on('data', function (chunk) {
		  payload = payload + chunk;

	 });

	  res.on('end', function(){
		  var obj = JSON.parse(payload)
		  var bus_date_time = new Date(obj.MonitoredLocation.Calls[0].ScheduledArrival)
		  var time_str = bus_date_time.toLocaleTimeString()

		  var body = {
		    speech: "The next service is expected at time " + time_str,
		    displayText: "The next service is expected at time " + obj.MonitoredLocation.Calls[0].ScheduledArrival,
		    data: {},
		    contextOut: [],
		    source: "reading-travelinfo"
		    };
		  response.setHeader('Content-Type', 'application/json');
		  response.send(JSON.stringify(body));

	  });

	}).end();


}

