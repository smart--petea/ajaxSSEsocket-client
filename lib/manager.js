var EE = require('./eventemitter');
var request = require('superagent');
var Socket = require('./socket');
var url = require('url');

module.exports = Manager;

function Manager(address, opts){
	this._sockets = {};
	this.__proto__ = new EE;

	var urlInfo = url.parse(address);
	this._server = urlInfo.protocol + '//' + urlInfo.host;
}

Manager.prototype._connect = function() {
	request.get();
}

Manager.prototype.socket = function(nsp) {
	this._sockets[nsp] = this._sockets[nsp] || new Socket(this, nsp);
	return this._sockets[nsp];
}
