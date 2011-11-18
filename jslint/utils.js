var STR_BLANK = '';

exports.Utils = {
	pushln: function(buffer, string, lines) {
		buffer.push(string + this.repeat('\n', lines || 1));
	},

	repeat: function(string, length) {
		return new Array(length + 1).join(string);
	},

	sub: function(s, o) {
		return s.replace ? s.replace(/\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g, function (match, key) {
			return typeof o[key] === 'undefined' ? match : o[key];
		}) : s;
	},

	trim: function (s) {
		try {
			return s.replace(/^\s+|\s+$/g, STR_BLANK);
		} catch (e) {
			return s;
		}
	}
};