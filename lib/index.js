/*
 * The skeleton of this file is gotten from socket.io source code.
 *
 * If you are looking for a original code then you are on wrong way. 
 * All this staff is intended to be for study porpuse.
 */
var Manager = require('./manager');
var Socket = require('./socket');
var Emitter = require('./eventemitter');

var util = require('./util');
var url = require('url');

module.exports = lookup;

var cache = exports.managers = {};

function lookup(url, opts) {
	if(! util.isString(url)) throw new Error('url is expected to be string');

	//I do not check if opts is object or not. The programmer is in charge with this moment
	opts = opts || {};

	var urlInfo = url.parse(url);
	var id = urlInfo.protocol + '//' + urlInfo.host; //protocol + hostname + port
	var io;

	if(opts.forceNew || opts['force new connection'] || opts.multiplex === false){
		io = new Manager(url, opts);
	} else {
		if( ! cache[id]) {
			cache[id] = new Manager(url, opts);
		}

		io = cache[id];
	}

	return io.socket(urlInfo.pathname);
}

lookup.Manager = Manager;
lookup.Socket = Socket;
lookup.Emitter = Emitter;
