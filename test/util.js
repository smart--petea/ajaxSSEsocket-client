var util = require('../lib/util');
var should = require('should');

describe('util', function() {
	describe('#isFunction', function() {
		it('[] - false', function(){
			util.isFunction([]).should.be.false;
		});

		it('function(){} - true', function() {
			util.isFunction(function(){}).should.be.true;
		});

		it('{} - false', function(){
			util.isFunction({}).should.be.false;
		});

		it('new Function - true', function() {
			util.isFunction(new Function).should.be.true;
		});
	});

	describe('#isArray', function() {
		it('["a", "b"] - true', function(){
			util.isArray(["a", "b"]).should.be.true;
		});
		it('[] - true', function() {
			util.isArray([]).should.be.true;
		});

		it('new Array - true', function() {
			util.isArray(new Array).should.be.true;
		});

		it('{} - false', function() {
			util.isArray({}).should.be.false;
		});

		it('1 - false', function(){
			util.isArray(1).should.be.false;
		});

		it('function - false', function() {
			util.isArray(function(){}).should.be.false;
		});
	});
});
