var Utils = require('./utils').Utils,
	
	STR_BLANK = '',

	HEADER_TPL = 'JSLint found {length} problems:\nFile: {file}.',

	ERROR_TPL = 'ERROR: [Lint on file ({file}) at line {line} character {character}]: {reason}\n\t ===> {evidence}',

	GLOBALS_TPL = 'NOTICE: Global variable ({name}).',

	VARIABLE_TPL = 'NOTICE: {type} variable ({name}) inside function ({function}) on file ({file}) at line {line}.';

var report = function(file, data) {
	var buffer = [],
		errors = data.errors,
		globals = data.globals,
		undefined_ = data['undefined'],
		unused = data.unused,
		totalErrors = (errors ? errors.length : 0),
		header = Utils.sub(HEADER_TPL, {
			file: file,
			length: totalErrors
		});

	Utils.pushln(buffer, Utils.repeat('=', 70));
	Utils.pushln(buffer, header);
	Utils.pushln(buffer, Utils.repeat('=', 70), 2);

	if (errors) {
		for (var i = 0; i < errors.length; i++) {
			var info = errors[i];

			if (info) {
				info.evidence = Utils.trim(info.evidence);
				info.file = file;
				Utils.pushln(buffer, Utils.sub(ERROR_TPL, info), 2);
			}
		}
	}

	if (globals) {
		globals = globals.sort();

		for (var i = 0; i < globals.length; i++) {
			Utils.pushln(buffer, Utils.sub(GLOBALS_TPL, { name: globals[i] }), 1);
		}
	}

	if (unused) {
		Utils.pushln(buffer, STR_BLANK);

		for (var i = 0; i < unused.length; i++) {
			var info = unused[i];
			info.file = file;
			info.type = 'Unused';
			Utils.pushln(buffer, Utils.sub(VARIABLE_TPL, info));
		}
	}

	if (undefined_) {
		Utils.pushln(buffer, STR_BLANK);

		for (var i = 0; i < undefined_.length; i++) {
			var info = undefined_[i];
			info.file = file;
			info.type = 'Undefined';
			Utils.pushln(buffer, Utils.sub(VARIABLE_TPL, info));
		}
	}

	return {
		totalErrors: totalErrors,
		log: buffer.join(STR_BLANK),
		shortlog: header
	};
};

module.exports = report;