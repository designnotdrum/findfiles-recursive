var readdirp = require('readdirp'),
	path = require('path'),
	es = require('event-stream'),
	fs = require('fs');

// print out all JS files to file

var makeMyList = fs.createWriteStream('filelist.json');

var stream = readdirp({
	root: path.join(__dirname),
	fileFilter: '*.js',
	directoryFilter: [
		'!.git',
		'!*modules',
		'!bower*'
	]
});

stream
	.on('data', function (entry) {
		console.log("Found a file named "+ entry.name + " at " + entry.path);
	})
	.on('warn', function (err) {
		console.error('non-fatal error', err);
	})
	.on('error', function (err) {
		console.error('shit\'s all fuckt up, mane', err);
	})
	.pipe(es.mapSync(function (entry) {
		return JSON.stringify([{filename: entry.name , friendlyName: entry.path , filePath: entry.path}], null, '\t');
	}))
	.pipe(es.join(","))
	.pipe(makeMyList);
