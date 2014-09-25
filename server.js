// WPRL: Use Markdown in comments, allowing nice code documentation to be
// generated using docco/grunt-docco.

// __Module Dependencies__
var express = require( 'express' );
var path = require( 'path' );
var config = require('config');

//Create server
var app = express();


app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//Show all errors in development
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// WPRL: TODO only use this in development e.g. use S3 for production
app.use( express.static( path.join( __dirname, 'site') ) );


//Start server
app.listen(process.env.PORT || 5000, function() {
	console.log('server listening on port %s', config.port);

});

//http://afternoon-depths-8057.herokuapp.com/
