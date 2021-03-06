function fetchWeatherInfo() {
	const address = document.getElementById("address").value;
	const messageText1 = document.getElementById("message-1");
	const messageText2 = document.getElementById("message-2");

	if (!address) {
		return alert("Please provide a address!");
	}

	messageText1.textContent = "Loading";
	messageText2.textContent = "";

	const url = "/weather?address=" + address;

	fetch(url).then((res) => {
		res.json().then((data) => {
			console.log(data);
			if (data.error) {
				messageText1.textContent = data.error;
			} else {
				messageText1.textContent = data.temp + ", " + data.desc;
				messageText2.textContent = data.placeName;
			}
		});
	});
}
