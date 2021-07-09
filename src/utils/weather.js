const request = require("request");

const weather = (latitude, longitude, callback) => {
	const apiKey = "19f6a61630e965a27a9aa72a1ebc5c22";

	const url =
		"https://api.openweathermap.org/data/2.5/onecall?lat=" +
		latitude +
		"&lon=" +
		longitude +
		"&exclude=hourly,daily&appid=" +
		apiKey +
		"&units=imperial";

	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback("Unable to connect to Weather service!", undefined);
		} else if (!body.current) {
			callback("Unable to find weather information", undefined);
		} else {
			const temp = body.current.temp;
			const desc = body.current.weather[0].description;
			callback(undefined, { temp, desc });
		}
	});
};

module.exports = weather;
