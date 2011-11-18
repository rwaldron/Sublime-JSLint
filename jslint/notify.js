var exec = require('child_process').exec;

var STR_BLANK = '',

	Notifiers = {
		'growlnotify': function(title, message, iconpath) {
			exec('/usr/local/bin/growlnotify -m "' + message + '" --image=' + iconpath);
		},

		'notify-send': function(title, message, iconpath) {
			exec('notify-send --icon=' + iconpath + ' "' + title + '" "' + message + '"');
		}
	};

var notifier = null;

var notify = function(report) {
	var instance = this,
		args = arguments,
		iconpath = __dirname + ((report.totalErrors > 0) ? '/images/error.png' : '/images/success.png');

	if (notifier) {
		notifier.call(instance, report.shortlog, report.file, iconpath);
	}
	else {
		for (var notifierName in Notifiers) {
			(function(notifierName) {
				exec('which ' + notifierName, function (error, stdout, stderr) {
					if (error === null) {
						notifier = Notifiers[notifierName];
						notify.apply(instance, args);
					}
				});
			})(notifierName);
		}
	}
};

module.exports = notify;