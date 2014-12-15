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
	this.warn = false;
}

EventEmitter.prototype.listeners = function(event) {
	var evLsn = this._events[event] ? this._events[event].slice() : [];
	var onceLsn = this._onceEvents[event] ? this._onceEvents[event].slice() : []; 
	return evLsn.concat(onceLsn);
}

EventEmitter.prototype.setMaxListeners = function(n) {
	if(n !== +n) throw new Error("not number");
	if(n < 0) throw new Error("negative number");

	this._maxListeners = n;

	if(this._maxListeners < n || !this.warn) return;

	//maxListeners > n
	//I must working with warn parameter
	var maxListener = 0;
	for(var event in this._events) this._events[event].length > maxListener && (maxListener = this._events[event].length);

	this.warn = maxListener < this._maxListeners;
}

EventEmitter.prototype.on = function(event, listeners) {
	return this._on(event, listeners, this._events, true);
}

EventEmitter.prototype.addListener = EventEmitter.prototype.on;

EventEmitter.prototype.once = function(event, listeners) {
	return this._on(event, listeners, this._onceEvents);
}

EventEmitter.prototype._on = function(event, listeners, listenersStorage, maxListenerWarning) {
	if(isObject(event)) {
		var eventObject = event;
		for(event in eventObject) this._on(event, eventObject[event], listenersStorage, maxListenerWarning);
		return;
	}

	if( ! isString(event) ) { throw new Error("event name is not string");}
	if(isFunction(listeners) ) {
		listeners = [listeners];
	} else if(! isArray(listeners) ) {
		throw new Error("listeners are not either array or function");
	}

	var eventListeners = listenersStorage[event] = listenersStorage[event] || [];

	while(listeners.length) {
		var listener = listeners.shift();
		eventListeners.indexOf(listener) === -1 && this.emit('newListener', event, listener);
		eventListeners.push(listener);
	}

	if(maxListenerWarning && !this.warn && eventListeners.length > this._maxListeners) {
		throw new Error('there are more than ' + maxListeners + ' listeners for event ' + event);
	}

	return this;
}


EventEmitter.prototype.emit = function(event) {
	if( ! isString(event) ) { throw "event name is not string";}

	var evListeners = this._events[event] = this._events[event] || [];
	var onceEvListeners = this._onceEvents[event] = this._onceEvents[event] || [];
	var key;

	for(key in evListeners) evListeners[key].apply(null, [].slice.call(arguments, 1));
	for(key in onceEvListeners) {
		onceEvListeners[key].apply(null, [].slice.call(arguments, 1));
		this.removeListener(event, onceEvListeners[key]);
	}

	return (evListeners.length + onceEvListeners.length) > 0;
}

EventEmitter.prototype.removeListener = function(event, listener) {
	if(! isString(event)) throw new Error("event must be string");
	if(! isFunction(listener)) throw new Error("listener must be function");

	var index;
	var evLsns = this._events[event];
	var onceLsns = this._onceEvents[event];

	if(evLsns && evLsns.length && ~(index = evLsns.indexOf(listener))) {
		 evLsns.splice(index, 1);
		 evLsns.indexOf(listener) === -1 && this.emit('removeListener', event, listener);
	}

	if(onceLsns && onceLsns.length && ~(index = onceLsns.indexOf(listener))) {
		 onceLsns.splice(index, 1);
		 onceLsns.indexOf(listener) === -1 && this.emit('removeListener', event, listener);
	}

	return this;
}

EventEmitter.prototype.removeAllListeners = function(event) {
	var emiter = this;
	function __removeLE(eve, listeners) {
		if(! isArray(listeners) || listeners.length === 0) return;
		var listener;
		while(listeners.length) {
			listener = listeners.shift();
			listeners.indexOf(listener) === -1 && emiter.emit('removeListener', eve, listener);
		}
	}

	if(event === undefined) {
		//remove all existing listeners
		for(var ev in this._events) __removeLE(ev, this._events[ev])
		for(var ev in this._onceEvents) __removeLE(ev, this._onceEvents[ev])

	} else if(isString(event)){

		__removeLE(event, this._events[event]);
		__removeLE(event, this._onceEvents[event]);

	} else {
		throw new Error('event argument is not either string or undefined');
	}

	return this;
}

EventEmitter.prototype.listenerCount = function(emitter, event) {
	return emitter.listeners(event).length;
}
