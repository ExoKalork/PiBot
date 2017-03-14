var config = require('./config.json');
var fs = require('fs');
var Twitter = require('twitter');

var acc = new Twitter({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token_key: config.access_token_key,
	access_token_secret: config.access_token_secret
});

function postTweet() {
	var progress = 0;
	var decimals = "";

	fs.readFile('progress.txt', 'utf8', function (err, data) {
		if (err) {
			if (err.code === "ENOENT") {
				console.log("progress.txt doesn't exist, creating it. Thanks for using this bot !");
				fs.writeFile('progress.txt', "0", 'utf8', function() {});
			} else {
				console.log(err);
			}
		}

		progress = parseInt(data, 10);

		fs.readFile('pi.txt', 'utf8', function (err, data) {
			if (err) {
				if (err.code === "ENOENT") {
					console.log("There is no pi.txt file available. Please add one.");
					return;
				} else {
					console.log(err);
				}
			}

			for (var i = 0; i < config.decimals; i++) {
				decimals += data[progress + i];
			}

			progress += config.decimals;
			fs.writeFile('progress.txt', progress, 'utf8', function() {
				var status = {
					status: decimals + " " + config.additional_text
				};

				console.log("");
				console.log("progress : " + progress);
				console.log("tweet : " + status.status);
				console.log("");

				console.log("/*Post tweet here*/");
				/*acc.post('statuses/update', status, function (error, tweet, response) {
					if (error) {
						console.log(error);
						console.log(status);
					}
				});*/
			});
		});
	});
}

postTweet();