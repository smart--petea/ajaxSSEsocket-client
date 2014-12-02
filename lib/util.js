/*
 * FROM: http://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string 
 */
module.exports.isString = function(arg) {
	return (typeof arg === 'string') || (arg instanceof String);
}
