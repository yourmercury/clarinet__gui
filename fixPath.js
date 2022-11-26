const process = require("node:process");
const {shellPathSync} = require("shell-path");

module.exports = function fixPath() {
	if (process.platform === 'win32') {
		return;
	}

	process.env.PATH = shellPathSync() || [
		'./node_modules/.bin',
		'/.nodebrew/current/bin',
		'/usr/local/bin',
		process.env.PATH,
	].join(':');
}
