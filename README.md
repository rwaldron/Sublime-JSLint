Cross-Platform JSLint Support for Sublime Text Editor 2 (using NodeJS)
========================

JSLint is an indispensable tool if you're serious about your JavaScript code quality. This project provides a cross-platform script which helps Sublime Text 2 to check JSLint when you’re working within a JavaScript file.

Features:

	Notification support using Growl (http://growl.info/) on OSX and notify-send on Linux. Those settings are configurable on "sublime-jslint (Linux).sublime-settings", "sublime-jslint (OSX).sublime-settings", and "sublime-jslint (Windows).sublime-settings".

	Make sure you update the "node_path" and "notification_command" on your system to the right paths. If you are using the default installation of OSX and Ubuntu they should work fine.

		{
			"node_path": "/usr/local/bin/node",

			"notification_command": "/usr/bin/notify-send \"%(title)s\" \"%(msg)s\" --icon=\"%(image)s\""
		}

Added commands:

	JSLint: Quick Check (Ctrl+Shift+L)
	JSLint: View Full Report (Ctrl+Shift+Alt+L)

Open up a .js file and hit Ctrl+Shift+L for Quick Report and Ctrl+Shift+Alt+L. An inline prompt will appear giving you the JSLint results:

Screenshots
-------------

![](https://github.com/eduardolundgren/sublime-jslint/raw/master/images/screenshot.png)
![](https://github.com/eduardolundgren/sublime-jslint/raw/master/images/preview.png)