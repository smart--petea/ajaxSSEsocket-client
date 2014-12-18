var Manager = require('./manager');
var Socket = require('./socket');
var Emitter = require('./eventemitter');

module.exports = io;

function io(url, opts) {
	opts = opts || {};
}

io.Manager = Manager;
io.Socket = Socket;
io.Emitter = Emitter;
