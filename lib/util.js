/*
 * FROM: http://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string 
 */
module.exports.isString = function(arg) {
	return (typeof arg === 'string') || (arg instanceof String);
}

/*
 *FROM: http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
 */
module.exports.isFunction = function(arg) {
	return typeof arg === 'function';
}

/*
 *FROM: http://stackoverflow.com/questions/8511281/check-if-a-variable-is-an-object-in-javascript
 */
module.exports.isObject = function(arg){
	return (arg !== null) && (typeof arg === 'object');
}

/*
 *http://stackoverflow.com/questions/767486/how-do-you-check-if-a-variable-is-an-array-in-javascript
 */
module.exports.isArray = function(arg) {
	return arg instanceof Array;
}
