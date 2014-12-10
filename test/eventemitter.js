var EE = require('../lib/eventemitter');
var should = require('should');

describe('EventEmitter', function() {
	describe('events', function() {
		describe('newListener', function() {
			it('check arguments', function() {
				var ee = new EE;
				var eventName = 'eventName';
				var eventListener = function(){};

				ee.on('newListener', function(evName, evListener) {
					evName.should.equal(eventName);
					evListener.should.equal(eventListener);
				});

				ee.on(eventName, eventListener);
			});

			it('same type of listeners - fired once', function() {
				var ee = new EE;
				var eventName = 'eventName';
				var evL1 = function(){};
				var evL2 = function(){};

				var count = 0;

				ee.on('newListener', function(evName, evListener) {
					evListener === evL1 && ++count;
					evListener === evL2 && ++count;
				});

				ee.on(eventName, evL1);
				ee.on(eventName, evL2);
				ee.on(eventName, evL1);
				ee.on(eventName, evL1);
				ee.on(eventName, evL2);
				ee.on(eventName, evL2);

				count.should.equal(2);
			});
		});

		describe('removeListener', function() {
			it('check arguments', function(done) {
				var ee = new EE;

				var eventName = 'eventName';
				var eventListener = function(){};

				ee.on('removeListener', function(evName, evListener) {
					evListener.should.equal(eventListener);
					evName.should.equal(eventName);
					done();
				});

				ee.on(eventName, eventListener);
				ee.removeListener(eventName, eventListener);
			});

			it('fired if no more such listeners', function() {
				var ee = new EE;

				var eventName = 'eventName';
				var eventListener = function() {};

				var count = 0;

				ee.on('removeListener', function(evName, evListener) {
					++count;
				});

				ee.on(eventName, eventListener);
				ee.on(eventName, eventListener);

				ee.removeListener(eventName, eventListener);
				count.should.equal(0);

				ee.removeListener(eventName, eventListener);
				count.should.equal(1);
			});
		});
	}); 
});
