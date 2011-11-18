var exec = require('child_process').exec;

var STR_BLANK = '',

	Notifiers = {
		'growlnotify': function(message, iconpath) {
			exec('/usr/local/bin/growlnotify -m "' + message + '" --image=' + iconpath);
		},

		'notify-send': function(message, iconpath) {
			exec('notify --icon=' + iconpath + ' ' + message);
		}
	};

var notifier = null;

var notify = function(report) {
	var instance = this,
		args = arguments,
		iconpath = (report.totalErrors > 0) ? './images/error.png' : './images/success.png';

	if (notifier) {
		notifier.call(instance, report.shortlog, iconpath);
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