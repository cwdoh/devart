var fs = require('fs'),
    path = require("path"),
    marked = require('marked');

var basePath = process.cwd(),
    headerPath = path.join(basePath, 'template/header.html'),
    markdownPath = path.join(basePath, 'README.md'),
    footerPath = path.join(basePath, 'template/footer.html'),
    outputPath = path.join(basePath, 'index.html');

// remove output file.
fs.exists(outputPath, function (exists) {
  if ( exists ) {
    console.log( "REMOVE: " + outputPath );
    fs.unlinkSync(outputPath);
  }

  // header
  fs.appendFileSync( outputPath, fs.readFileSync( headerPath ) );

  // markdown body
  fs.appendFileSync( outputPath, marked( fs.readFileSync( markdownPath ).toString() ) );

  // footer
  fs.appendFileSync( outputPath, fs.readFileSync( footerPath ) );

  console.log( "GENERATED: " + outputPath );
});
