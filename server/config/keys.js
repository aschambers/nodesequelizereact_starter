if(process.env.NODE_ENV === 'production') {
	// return keys for production
	module.exports = require('./prod');
} else {
	// return keys for developement
	module.exports = require('./dev');
}
