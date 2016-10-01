"use strict";

const backStack = [];

backStack.remove = function (fn) {
	const idx = backStack.indexOf(fn);

	if (idx >= 0)
		backStack.splice(idx, 1);
};

window.addEventListener("keydown", function triggerBackOnEscape(ev) {
	if (ev.key != "Escape" || backStack.length < 1 || ev.target != document.body)
		return;

	backStack.pop()();
});

export default backStack;
