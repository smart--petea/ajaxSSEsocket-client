var EE = require('../lib/eventemitter');
var should = require('should');

describe('EventEmitter', function() {
	describe('methods', function() {
		describe('#on', function() {
			it('(evName, lsn)', function() {
				var ee = new EE;
				var eventName = 'eventName';
				var eventListener = function(){};
				
				ee.listeners(eventName).should.be.length(0);
				ee.on(eventName, eventListener);
				ee.listeners(eventName).should.be.length(1);
			});

			it('(evName, [lsn1, lsn2])', function() {
				var ee = new EE;
				var eventName = 'eventName';
				var evLsn1 = function(){};
				var evLsn2 = function(){};

				ee.listeners(eventName).should.be.length(0);
				ee.on(eventName, [evLsn1, evLsn2]);
				ee.listeners(eventName).should.be.length(2);
			});

			it('({evName1: lsn11, evName2: [lsn21, lsn22, lsn23]})', function() {
				var ee = new EE;
				var evName1 = 'evName1';
				var evName2 = 'evName2';
				var lsn11 = function(){};
				var lsn21 = function(){};
				var lsn22 = function(){};
				var lsn23 = function(){};

				var params = {};

				params[evName1] = lsn11;
				params[evName2] = [lsn21, lsn22, lsn23];

				ee.on(params);

				var listeners1 = ee.listeners(evName1);
				listeners1[0].should.be.equal(lsn11);

				var listeners2 = ee.listeners(evName2);
				listeners2[0].should.be.equal(lsn21);
				listeners2[1].should.be.equal(lsn22);
				listeners2[2].should.be.equal(lsn23);
			});

			it('[lsn1, lsn2] + lsn3 = [lsn1, lsn2, lsn3] - order preservation', function() {
				var ee = new EE;
				var eventName = 'eventName';
				var evLsn1 = function(){};
				var evLsn2 = function(){};
				var evLsn3 = function(){};

				ee.on(eventName, [evLsn1, evLsn2]);
				ee.on(eventName, evLsn3);

				var listeners = ee.listeners(eventName);
				listeners[0].should.equal(evLsn1);
				listeners[1].should.equal(evLsn2);
				listeners[2].should.equal(evLsn3);

			});

			it('() - throw error', function() {
				try {
					(new EE).on();
				} catch (e) {
					e.message.should.be.equal("event name is not string");
				}
			});

			it('(evName1) - throw error', function() {
				try {
					(new EE).on('ok');
				} catch (e) {
					e.message.should.be.equal("listeners are not either array or function");
				}
			});
		});
	});
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
