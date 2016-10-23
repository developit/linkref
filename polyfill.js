var linkRef = require('.');
var Component = require('preact').Component;

Component.prototype.linkRef = function(name) {
	return linkRef(this, name);
};
