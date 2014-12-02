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
