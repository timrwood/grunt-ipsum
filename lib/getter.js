module.exports = function (obj, key, cb) {
	Object.defineProperty(obj, key, {
		get: function () {
			function getInner() {
				return cb.apply(null, arguments);
			}
			getInner.toString = getInner.toJSON = getInner.valueOf = getInner;
			return getInner;
		},
		set: function () {},
		enumerable: true
	});
};
