const request = require("request");

const geocode = (address, callback) => {
	const apiKey =
		"pk.eyJ1IjoiYWJoaXNoZWtoYXJpMjkiLCJhIjoiY2txajRrb2x3MDNxMDJ4cGh0czIwczZsMCJ9.OueqQe3fzMHaAD5SV8Y9OQ";
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?limit=1&access_token=" +
		apiKey;

	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback("Unable to connect to Location service!", undefined);
		} else if (body.features.length === 0) {
			callback("Unable to find location! Try again.", undefined);
		} else {
			const latitude = body.features[0].center[1];
			const longitude = body.features[0].center[0];
			const placeName = body.features[0].place_name;
			const location = {
				latitude,
				longitude,
				placeName
			};
			callback(undefined, location);
		}
	});
};

module.exports = geocode;
