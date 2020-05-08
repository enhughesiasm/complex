import { useEffect, useRef } from 'react';

export function create_UUID() {
	var dt = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
		/[xy]/g,
		function (c) {
			var r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
		}
	);
	return uuid;
}

export function getHashCode(str) {
	var hash = 0,
		i,
		chr;
	if (str.length === 0) return hash;
	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

export function useTraceUpdate(props) {
	const prev = useRef(props);
	useEffect(() => {
		const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
			if (prev.current[k] !== v) {
				ps[k] = [prev.current[k], v];
			}
			return ps;
		}, {});
		if (Object.keys(changedProps).length > 0) {
			console.log('Changed props:', changedProps);
		}
		prev.current = props;
	});
}

export function orderByMultipleProperties(prop) {
	var args = Array.prototype.slice.call(arguments, 1);
	return function (a, b) {
		let equality = 0;
		if (Number.isInteger(a[prop]) && Number.isInteger(b[prop])) {
			equality = a[prop] - b[prop];
		} else {
			equality = (a[prop] || '')
				.toString()
				.localeCompare((b[prop] || '').toString());
		}
		if (equality === 0 && arguments.length > 1) {
			return orderByMultipleProperties.apply(null, args)(a, b);
		}
		return equality;
	};
}

export function JSON_to_URLEncoded(element, key, list) {
	var list = list || [];
	if (typeof element == 'object') {
		for (var idx in element)
			JSON_to_URLEncoded(
				element[idx],
				key ? key + '[' + idx + ']' : idx,
				list
			);
	} else {
		list.push(key + '=' + encodeURIComponent(element));
	}
	return list.join('&');
}

export function groupBy(array, fnSelectKey) {
	return array.reduce(
		(r, v, i, a, k = fnSelectKey(v)) => ((r[k] || (r[k] = [])).push(v), r),
		{}
	);
}

export function submitToAnalytics(action, category, label, value) {
	if (window.gtag) {
		window.gtag('event', action, {
			event_category: category,
			event_label: label || '',
			value: value || 0,
		});
	}
}

export function unloadBuyMeACoffeeWidget() {
	let n = document.getElementById('bmc-wbtn');

	if (n) {
		let s = n.nextElementSibling;
		if (s && s.innerText.indexOf('coffee')) {
			s.remove();
		}
		n.remove();
	}
}

export const addBodyClass = (className) =>
	document.body.classList.add(className);
export const removeBodyClass = (className) =>
	document.body.classList.remove(className);
export const hasBodyClass = (className) =>
	document.body.classList.contains(className);
