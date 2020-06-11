var request = require("request");
request("http://dataservice.accuweather.com/locations/v1/search?apikey=CYWFlLdOFvDj8zq66MIBHz7kGkEf4NeY&q=Nanjing", function(error, response, body) {
	if (!error && response.statusCode == 200) {
		const parsedData = JSON.parse(body);
		console.log(parsedData[0]["Key"]);
		console.log(parsedData[0]["EnglishName"]);
		
	}
});