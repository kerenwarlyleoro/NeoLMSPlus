// ==UserScript==
// @name        NeoLMS+ Userscript
// @namespace   Violentmonkey Scripts
// @include     /.*lms\..*|.*\/.*lms.*/
// @grant       none
// @version     1.0
// @author      K8y
// ==/UserScript==

window.addEventListener('load', (e) => {
	// Display readings inside page.
	const handout_readings_viewer = document.querySelectorAll(
		'div.materialStyle > p > a[href*="files"][target="_blank"][rel="noopener"]'
	);
	if (handout_readings_viewer.length) {
		for (const el of handout_readings_viewer) {
			const iframe = document.createElement('iframe');
			iframe.src = el.getAttribute('href');
			iframe.style.maxWidth = '100%';
			iframe.style.width = '810px';
			iframe.style.height = '698px';
			iframe.setAttribute('loading', 'lazy');
			el.parentNode.insertBefore(iframe, el);

			// Add br element for better formatting.
			const br = document.createElement('br');
			el.parentNode.insertBefore(br, el);

			el.parentNode.style.textAlign = 'center';
		}
	}

	// Convert show_event onCLicks to proper hrefs
	function fix_onclicks() {
		const onEventLinks = document.querySelectorAll('a[onClick*="show_event"]');

		if (onEventLinks.length) {
			for (const el of onEventLinks) {
				if (!el.hasAttribute('onClick')) continue;

				const matches = Array.from(el.getAttribute('onClick').matchAll(/show_event\('(.+)'\)/g), (m) => m[1]);
				if (matches.length) {
					const match = matches[0];

					el.href = match;
					el.removeAttribute('onClick');
				}
			}
		}
	}
	var observer = new MutationObserver(fix_onclicks);
	observer.observe(document.body, { childList: true, subtree: true });
	fix_onclicks();
});
