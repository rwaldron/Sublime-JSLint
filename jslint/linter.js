var fs = require('fs');
var jslint = require("./lib/jslint");
var prefs = require("./jslint-prefs");
var report = require("./report");
var notify = require("./notify");

var notficationType = process.argv[2],
	SHOW_ALL = (notficationType === '--all'),
	SHOW_LOG = (notficationType === '--log'),
	SHOW_SHORTLOG = (notficationType === '--shortlog');

process.argv.forEach(function (file, index) {
	if (index > 2) {
		fs.readFile(file, 'ascii', function (err, source) {
			if (!err) {
				var passed = jslint(source, prefs);
				var resultReport = report(file, jslint.data());

				if (SHOW_ALL || SHOW_SHORTLOG) {
					notify(resultReport);
				}

				if (SHOW_ALL || SHOW_LOG) {
					console.log(resultReport.log);
				}
			}
			else {
				console.error("%s", err);
			}
		});
	}
});