module.exports = EventEmitter;

function EventEmitter() {
	this.events = {};
}

EventEmitter.prototype.listeners = function(event) {
	return this.events[event] || [];
}
