var readdirp = require('readdirp'),
	path = require('path'),
	es = require('event-stream'),
	fs = require('fs');

// print out all JS files to console

var datArrayDoe = [];

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
		datArrayDoe.push({ name: entry.name, path: entry.parentDir });
	})
	.on('warn', function (err) {
		console.error('non-fatal error', err);
	})
	.on('error', function (err) {
		console.error('shit\'s all fuckt up, mane', err);
	})	
	//.pipe(es.stringify(datArrayDoe))
	.pipe(es.mapSync(function (entry) {
		return JSON.stringify({ name: entry.parentDir, path: entry.path }, null, '\t');
	}))
	.pipe(makeMyList);