const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

//Paths
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars and views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup Public directory
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
	res.render("index", { title: "Home", author: "Abhishek" });
});

app.get("/help", (req, res) => {
	res.render("help", { title: "Help", author: "Abhishek" });
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About", author: "Abhishek" });
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Provide a address to search"
		});
	}

	const address = req.query.address;

	geocode(address, (error, { latitude, longitude, placeName } = {}) => {
		if (error) {
			res.send({ error });
		} else {
			weather(latitude, longitude, (error, { temp, desc } = {}) => {
				if (error) {
					res.send({ error });
				} else {
					res.send({ placeName, temp, desc });
				}
			});
		}
	});
});

app.get("/help/*", (req, res) => {
	res.render("error-404", { error: "Help Article not found" });
});

app.get("*", (req, res) => {
	res.render("error-404", { error: "Page not found", author: "Abhishek" });
});

app.listen(port, () => {
	console.log("Server is running on port " + port);
});
