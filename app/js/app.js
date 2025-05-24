
document.addEventListener("DOMContentLoaded", (event) => {
	// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
	gsap.registerPlugin(ScrollTrigger);

	// ScrollSmoother.create({
	// 	smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
	// 	effects: true, // looks for data-speed and data-lag attributes on elements
	// 	smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
	// });

	gsap.fromTo('.hero', { opacity: 1 }, {
		opacity: 0,
		scrollTrigger: {
			trigger: '.hero',
			start: 'center',
			end: 400,
			scrub: true
		}
	})

	gsap.fromTo('.aiel-menu', { x: -500, opacity: 1 }, {
		opacity: 1, x: 0,
		scrollTrigger: {
			trigger: '.aiel-menu',
			end: 400,
			scrub: true
		}
	})
	gsap.fromTo('.cucumber', { x: 500, opacity: 1 }, {
		opacity: 1, x: 0,
		scrollTrigger: {
			trigger: '.cucumber',
			end: 400,
			scrub: true
		}
	})
	gsap.fromTo('.photo-1', { x: 500, opacity: 1 }, {
		opacity: 1, x: 0,
		scrollTrigger: {
			trigger: '.photo-1',
			end: 400,
			scrub: true
		}
	})
	gsap.fromTo('.photo-2', { x: 1000, opacity: 1 }, {
		opacity: 1, x: 0,
		scrollTrigger: {
			trigger: '.photo-1',
			end: 400,
			scrub: true
		}
	})
	gsap.fromTo('.photo-3', { x: 1500, opacity: 1 }, {
		opacity: 1, x: 0,
		scrollTrigger: {
			trigger: '.photo-1',
			end: 400,
			scrub: true
		}
	})

	initializeModalHandler()
	initialRating()
	initialChatScroll()
});

function initializeModalHandler() {
	window.modalHandler = {
		open(event, modalId) {
			event.preventDefault();
			const modal = document.getElementById(modalId);
			if (modal) {
				modal.classList.add('active');
			}
		},
		close(event = null, modalId) {
			if (event && event.preventDefault) {
				event.preventDefault();
			}
			const modal = document.getElementById(modalId);
			if (modal) {
				modal.classList.remove('active');
			}
		}
	};
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			document.querySelectorAll('.v-modal__overlay.active').forEach(modal => modal.classList.remove('active'));
		}
	});
}

function initialRating() {
	document.querySelectorAll(".v-rating").forEach(rating => {
		const stars = rating.querySelectorAll(".v-rating__star");
		const hiddenInput = rating.querySelector("#rating-value");

		stars.forEach(star => {
			star.addEventListener("click", () => {
				const value = parseInt(star.dataset.value, 10);
				hiddenInput.value = value;
				rating.dataset.rating = value;

				stars.forEach(s => {
					s.classList.toggle("filled", parseInt(s.dataset.value, 10) <= value);
				});
			});

			star.addEventListener("mouseover", () => {
				const hoverValue = parseInt(star.dataset.value, 10);
				stars.forEach(s => {
					s.classList.toggle("filled", parseInt(s.dataset.value, 10) <= hoverValue);
				});
			});

			rating.addEventListener("mouseleave", () => {
				const savedValue = parseInt(rating.dataset.rating, 10);
				stars.forEach(s => {
					s.classList.toggle("filled", parseInt(s.dataset.value, 10) <= savedValue);
				});
			});
		});
	});
}

function initialChatScroll() {
	window.scrollChatToBottom = function (selector = '.v-chat__content') {
		const el = document.querySelector(selector);
		if (el) {
			el.scrollTop = el.scrollHeight;
		}
	};

	window.addEventListener('DOMContentLoaded', () => {
		window.scrollChatToBottom();
	});
}