var EE = require('./eventemitter');
var Conexion = require('./conexion');

module.exports = Socket;

function Socket(io, nsp){
	EE.call(this);
	this.__proto__.__proto__ = new EE;

	this.io = io;

	this._conexion = new Conexion(io, this, nsp);
}
