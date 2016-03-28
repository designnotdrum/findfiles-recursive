var fs = require('fs');
var path = require('path');
var process = require('process');

// Folders to check
var checkFolder = "/Users/Nick/Desktop/test-findfile";

// loop through files in the directory
fs.readdir( checkFolder, function(err, files) {
	if(err){
		console.error("Couldn't list directory. Sorry, braj.", err);
		process.exit(1);
	}
	
	var datArrayDoe = [];
	
	files.forEach( function(file,index) {
		// make one pass and make the file complete
		var fromPath = path.join(checkFolder,file);
		

		fs.stat(fromPath,function(error,stat){
			if(error){
				console.error("Error stating file. Sorry, broheim.");
				return;
			}

			if(stat.isFile()){
				console.log("'%s' is a file",fromPath);
				//var names = JSON.stringify(file);
				var fileNameExt = file.split('/').pop();
				var fileName = fileNameExt.split('.').pop();
				var jsonifiedFileName = JSON.stringify({ name: fileNameExt, ext: fileName }, null, '\t');
				datArrayDoe.push(jsonifiedFileName);

				console.log(datArrayDoe,fromPath, 'has a length of ' + datArrayDoe.length);
				
			} else if(stat.isDirectory()) {
				console.log("'%s' is a directory, and you don't care about those.",fromPath);
			}
		});
	});

	//if(datArrayDoe.length < 0){
		console.log(datArrayDoe);

		fs.writeFile('filelist.json', datArrayDoe, function(err,data) {
			if(err){
				return console.log('Damn, you fucked up.',err);
			}
			console.log('Your list of files was written to file.')
		});
	//}
	
});