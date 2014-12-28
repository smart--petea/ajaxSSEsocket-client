var EE = require('./eventemitter');
var Socket = require('./socket');
var url = require('url');

module.exports = Manager;

function Manager(address, opts){
	this._sockets = {};
	this.__proto__ = new EE;

	var urlInfo = url.parse(address);

	this._serverUrl = urlInfo.protocol + '//' + urlInfo.host;
}

Manager.prototype.socket = function(nsp) {
	this._sockets[nsp] = this._sockets[nsp] || new Socket(this, nsp);
	return this._sockets[nsp];
}
