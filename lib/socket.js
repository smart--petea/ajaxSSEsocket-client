var EE = require('./eventemitter');

module.exports = Socket;

function Socket(io, nsp){
	this.__proto__ = new EE;
	this.io = io;
}
