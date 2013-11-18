module.exports = function (obj, key, cb, defaults) {
	defaults = defaults || [];
	Object.defineProperty(obj, key, {
		get: function () {
			function getInner() {
				var args = [].slice.apply(arguments), i;
				for (i = args.length; i < defaults.length; i++) {
					args[i] = defaults[i];
				}
				return cb.apply(null, args);
			}
			getInner.toString = getInner.toJSON = getInner.valueOf = getInner;
			return getInner;
		}
	});
};
