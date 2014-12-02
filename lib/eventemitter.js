module.exports = EventEmitter;

function EventEmitter() {
	this._events = {};
	this._maxListeners = 10;
}

EventEmitter.prototype.listeners = function(event) {
	return this._events[event] || [];
}

EventEmitter.prototype.setMaxListeners = function(n) {
	if(n !== +n) throw "not number";
	if(n < 0) throw "negative number";

	this._maxListeners = n;
}
