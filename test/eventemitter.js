var EE = require('../lib/eventemitter');
var should = require('should');

describe('EventEmitter', function() {
	describe('methods', function() {
		describe('#removeListener', function() {
			it('(event) - error, listener is not defined', function() {
				try {
					(new EE).removeListener('ok');
				} catch (e) {
					e.message.should.equal("listener must be function");
				}
			});

			it('({}, lsn) - error, event must be string', function(){
				try {
					(new EE).removeListener({}, function(){});
				} catch (e) {
					e.message.should.equal("event must be string");
				}
			});

			it('should remove listener', function() {
				var ee = new EE;
				var eventName = 'eventName';
				var lsnOnce = function(){};
				var lsnOn = function(){};

				ee.on(eventName, lsnOn);
				ee.once(eventName, lsnOnce);
				ee.listeners(eventName).should.length(2);

				ee.removeListener(eventName, lsnOn);
				ee.listeners(eventName).should.length(1);

				ee.removeListener(eventName, lsnOnce);
				ee.listeners(eventName).should.length(0);
			})

			it('should return emitter', function() {
				var ee = new EE;
				ee.removeListener('ok', function(){}).should.equal(ee);
			});

			it('should generate `removeListener` event', function(done) {
				var ee = new EE;
				var eventName = 'eventName';
				var evLsn = function(){};

				ee.on(eventName, evLsn);
				ee.on('removeListener', function(event) { 
					event.should.equal(eventName);
					done();
				});	

				ee.removeListener(eventName, evLsn);
			});
		});

		describe('#once vs #on', function() {
			it('listeners = lsnsOnce + lsnsOn', function(){
				var ee = new EE;
				var eventName = 'eventName';


				ee.on(eventName, function(){});
				ee.once(eventName, function(){});
				ee.listeners(eventName).should.length(2);
				
				ee.emit(eventName);

				ee.listeners(eventName).should.length(1);
			});

			it('lsnOnce !== lsnOn', function(done) {
				var ee = new EE;
				var eventName = 'eventName';
				var lsnOnce = function(){};

				ee.on(eventName, function(){});
				ee.once(eventName, lsnOnce);
				ee.on('removeListener', function(event, lsn) {
					event.should.equal(eventName);
					lsn.should.equal(lsnOnce);

					done();
				});

				ee.emit(eventName);
			});
		});
		describe('#once', function() {
			it('(evName, lsn)', function() {
				var ee = new EE;
				var eventName = 'eventName';
				var eventListener = function(){};
				
				ee.listeners(eventName).should.be.length(0);
				ee.once(eventName, eventListener);
				ee.listeners(eventName).should.be.length(1);
			});

			it('(evName, [lsn1, lsn2])', function() {
				var ee = new EE;
				var eventName = 'eventName';
				var evLsn1 = function(){};
				var evLsn2 = function(){};

				ee.listeners(eventName).should.be.length(0);
				ee.once(eventName, [evLsn1, evLsn2]);
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

				ee.once(params);

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

				ee.once(eventName, [evLsn1, evLsn2]);
				ee.once(eventName, evLsn3);

				var listeners = ee.listeners(eventName);
				listeners[0].should.equal(evLsn1);
				listeners[1].should.equal(evLsn2);
				listeners[2].should.equal(evLsn3);

			});

			it('() - throw error', function() {
				try {
					(new EE).once();
				} catch (e) {
					e.message.should.be.equal("event name is not string");
				}
			});

			it('(evName1) - throw error', function() {
				try {
					(new EE).once('ok');
				} catch (e) {
					e.message.should.be.equal("listeners are not either array or function");
				}
			});

			it('fire `removeListener` after call emit', function(done) {
				var lsn = function(){};
				var evName = 'ok';

				(new EE)
					.on('removeListener', function(ev, listener){ 
						ev.should.equal(evName);
						listener.should.equal(lsn);
						done();
					})
					.once(evName, lsn)
					.emit(evName);
			});

			it('remove listener after call emit', function(done) {
				var ee = new EE;
				var evName = 'ok';

				ee
					.on('removeListener', function() {
						ee.listeners(evName).should.length(0);
						done();
					})
					.once(evName, function(){})
					.emit(evName);
			});

			it('must return emitter', function() {
				var ee = new EE;
				ee.once('ok', function(){}).should.equal(ee);
			});
		});
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

			it('must return emitter', function() {
				var ee = new EE;
				ee.on('ok', function(){}).should.equal(ee);
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
