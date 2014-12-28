var request = require('superagent');

module.exports = Conexion;

function Conexion(manager, socket, nsp) {
	this._url = manager._serverUrl;
	this._nsp = nsp;

}

Conexion.prototype.connect = function() {
	request
		.post(this._url + '/' + this._nsp)
		.send({
			nsp: this._nsp,
			type: 0, //connect
		})
		.end(function(error, res) {
		});
}
