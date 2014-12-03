var util = require('./util');
var isObject = util.isObject;
var isArray  = util.isArray;
var	isFunction = util.isFunction;
var isString = util.isString;

module.exports = EventEmitter;

function EventEmitter() {
	this._events = {};
	this._onceEvents = {};
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

EventEmitter.prototype.on = function(event, listener) {
	if(isObject(event)) {
		for(var key in event) this.on(key, event[key]);
		return;
	}

	if( ! isString(event) ) { throw "event name is not string";}
	if(isFunction(listener) ) {
		listener = [listener];
	} else if(! isArray(listener) ) {
		throw "listeners are not either array or function";
	}

	this._events[event] = (this._events[event] || []).concat(listener); 

	return this;
}

EventEmitter.prototype.addListener = EventEmitter.prototype.on;

EventEmitter.prototype.once = function(event, listener) {
	if( ! isString(event) ) { throw "event name is not string";}

	if(isFunction(listener) ) {
		listener = [listener];
	} else if(! isArray(listener) ) {
		throw "listeners are not either array or function";
	}

	this._onceEvents[event] = (this._onceEvents[event] || []).concat(listener); 

	return this;
}

EventEmitter.prototype.emit = function(event) {
	if( ! isString(event) ) { throw "event name is not string";}

	var evListeners = this._events[event] || [];
	var onceEvListeners = this._onceEvents[event] || [];
	var key;

	delete this._onceEvents[event];

	for(key in evListeners) evListeners[key].call(null, arguments.slice(1));
	for(key in onceEvListeners) onceEvListeners[key].call(null, arguments.slice(1));

	return (evListeners.length + onceEvListeners.length) > 0;
}
