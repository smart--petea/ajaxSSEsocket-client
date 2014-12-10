var EE = require('../lib/eventemitter');
var should = require('should');

describe('EventEmitter', function() {
	describe('events - newListener', function() {
		it('(event, listener)', function() {
			var ee = new EE;
			var eventName = 'eventName';
			var eventListener = function(){};

			var counter = 0;

			ee.on('newListener', function(evName, evListener) {
				evName.should.equal(eventName);
				evListener.should.equal(eventListener);
				++counter;
			});

			//register for event
			//newListener for this event must be called only once
			ee.on(eventName, eventListener);
			ee.on(eventName, eventListener);
			ee.on(eventName, eventListener);

			counter.should.equal(1);
		});
	});
});
