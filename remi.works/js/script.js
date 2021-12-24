// Assign Color-Mode
if (
	localStorage.getItem('color-mode') === 'dark' ||
	(window.matchMedia('(prefers-color-scheme: dark').matches && !localStorage.getItem('color-mode'))
) {
	document.documentElement.setAttribute('color-mode', 'dark');
	localStorage.setItem('color-mode', 'dark');
} else {
	document.documentElement.setAttribute('color-mode', 'light');
	localStorage.setItem('color-mode', 'light');
}

/* WINDOW LOADING */
$(window).on('load', function() {
	'use strict';

	// Isotope Setup
	$('.items').isotope({
		filter: '*',
		itemSelector: '.items li',
		masonry: {
			columnWidth: 30,
			isFitWidth: true,
		},
		animationOptions: {
			duration: 150,
			easing: 'linear',
			queue: false,
		},
	});

	// Tiny Slider Setup
	$('.slider').each(function(index, element) {
		const slider = element.querySelector('.slider-container');
		const sliderControls = element.querySelector('.slider-controls');
		const sliderNav = element.querySelector('.slider-nav');

		const tnsSlider = tns({
			container: slider,
			controls: true,
			controlsContainer: sliderControls,
			controlsPosition: 'top',
			edgePadding: 0,
			speed: 850,
			mode: 'carousel',
			axis: 'horizontal',
			rewind: true,
			items: 4,
			loop: true,
			slideBy: 1,
			autoHeight: true,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayDirection: index % 2 === 0 ? 'forward' : 'backward',
			autoplayHoverPause: false,
			autoplayButton: false,
			autoplayButtonOutput: false,
			nav: true,
			//navContainer: sliderNav,
			navPosition: 'bottom',
			mouseDrag: true,
			touch: true,
			swipeAngle: false,
			navAsThumbnails: false,

			responsive: {
				0: {
					items: 1,
				},
				480: {
					items: 2,
				},
				768: {
					items: 3,
				},
				974: {
					items: 4,
				},
			},
		});
	});

	// Change Isotope Filter
	$('#filters a').on('click', function() {
		$('#filters .current').removeClass('current');
		$(this).addClass('current');

		var currentFilter = $(this).attr('data-filter');

		// Update Isotope Filter
		$('.items').isotope({
			filter: currentFilter,
			itemSelector: '.items li',
			masonry: {
				columnWidth: 30,
				isFitWidth: true,
			},
			animationOptions: {
				duration: 150,
				easing: 'linear',
				queue: false,
			},
		});

		return false;
	});
});

/* WINDOW READY */
$(function() {
	'use strict';

	// Generic Variables
	const $animations = document.querySelectorAll('.animated');
	const $counters = $('.counter');
	const $hero_btn = $('.hero-btn');
	const $nav = $('nav');
	const $navLinks = document.querySelectorAll('.nav-link');
	const $progress = $('#progress-bar');
	const $root = $('html, body');
	const $sections = $('section');
	const $sticky = $('.sticky');
	const $timeline = $('.timeline');
	const $timelineNodes = $('.timeline-content');
	const $welcome = $('.welcome-message');
	const $window = $(window);

	// Scroll Variables
	var loadOffset = 150;
	var timelineLoaded = false; // Only load timeline once.

	// Cycler Variables
	var text = 'null';
	var wordIndex = 0;

	// Generate a random welcome message for the the loader section
	const greetings = [
		'Bonjour!',
		'Enjoy your stay!',
		'Hello!',
		'Hi!',
		"How ya' doin?",
		'Howdy!',
		"I hope you're doing well!",
		'Salut!',
		'Welcome!',
		"What's good?",
		"What's cookin' good looking?",
		'Wipe your feet at the door!',
		'Invest in the best!',
		'What took you so long?',
		'Kept you waiting huh?',
		'See you later space cowboy.',
	];

	$welcome[0].innerHTML = getRandomElement(greetings, 0, greetings.length);

	// Preloader Fading
	$welcome.addClass('slide-up');
	setTimeout(() => {
		$('.loader').fadeOut(400, function() {
			// Play Landing Animations (if we load at the around the top of the page)
			if ($window.scrollTop() - 25 < $('#landing').height() / 2) {
				$animations.forEach((el) => {
					var el = $(el);

					if (el.hasClass('slide-up-animation')) {
						el.removeClass('slide-up-animation', 'animated');
						el.addClass('slide-up');
					} else if (el.hasClass('slide-down-animation')) {
						el.removeClass('slide-down-animation', 'animated');
						el.addClass('slide-down');
					} else if (el.hasClass('slide-right-animation')) {
						el.removeClass('slide-right-animation', 'animated');
						el.addClass('slide-right');
					} else if (el.hasClass('slide-left-animation')) {
						el.removeClass('slide-left-animation', 'animated');
						el.addClass('slide-left');
					}
				});
			} else {
				$animations.forEach((el) => {
					var el = $(el);
					if (el.hasClass('navbar')) {
						el.css('animation-delay', '0s');
						el.removeClass('slide-down-animation', 'animated');
						el.addClass('slide-down');
						return true;
					}
					el.removeClass('animated');
				});
			}
		});
	}, 800);

	// Remove Inactive Animation Classes

	function whichAnimationEvent() {
		var t,
			el = document.createElement('fakeelement');

		var animations = {
			animation: 'animationend',
			OAnimation: 'oAnimationEnd',
			MozAnimation: 'animationend',
			WebkitAnimation: 'webkitAnimationEnd',
		};

		for (t in animations) {
			if (el.style[t] !== undefined) {
				return animations[t];
			}
		}
	}

	var animationEvent = whichAnimationEvent();

	$animations.forEach((el) => {
		var el = $(el);

		el.one(animationEvent, function(event) {
			if (el.hasClass('slide-up')) {
				el.css('opacity', '1');
				el.removeClass('slide-up');
			}

			if (el.hasClass('slide-down')) {
				el.css('opacity', '1');
				el.removeClass('slide-down');
			}

			if (el.hasClass('slide-left')) {
				el.css('opacity', '1');
				el.removeClass('slide-left');
			}

			if (el.hasClass('slide-right')) {
				el.css('opacity', '1');
				el.removeClass('slide-right');
			}
		});
	});

	$.fn.visible = function(partial, offset = 0) {
		var $t = $(this),
			$w = $window,
			viewTop = $w.scrollTop(),
			viewBottom = viewTop + $w.height(),
			_top = $t.offset().top,
			_bottom = _top + $t.height(),
			compareTop = partial === true ? _bottom : _top,
			compareBottom = partial === true ? _top : _bottom;

		return compareBottom + offset <= viewBottom && compareTop >= viewTop + offset;
	};

	$.fn.below = function(offset = 0) {
		var $t = $(this),
			$w = $window,
			viewTop = $w.scrollTop(),
			viewMiddle = viewTop + $w.height() / 2,
			_top = $t.offset().top,
			_bottom = _top + $t.height();

		return !(_top + offset <= viewMiddle) && _bottom >= viewMiddle + offset;
	};

	function getRandomElement(array, min, max) {
		return array[Math.floor(Math.random() * max + min)];
	}

	$.fn.nullifyElement = function(element) {
		var $t = $(this),
			index = $t.index(element);
		if (index > -1) {
			$t.splice(index, 1, null);
		}
	};

	$.fn.removeElement = function(element) {
		var $t = $(this),
			index = $t.index(element);
		if (index > -1) {
			$t.splice(index, 1);
		}
	};

	// Already Visible Section
	$sections.each(function(i, el) {
		var el = $(el);
		if (el.visible(true, loadOffset)) {
			el.data('animated', true);
		} else {
			el.data('animated', false);
			el.css('opacity', '0');
		}
	});

	// Already Visible Timeline Nodes.
	$timelineNodes.each(function(i, el) {
		var el = $(el);
		if (el.visible(true, loadOffset)) {
			el.data('animated', true);
			$sections.nullifyElement(el);
		} else {
			el.data('animated', false);
			el.css('opacity', '0');
		}
	});

	// On Window Scroll, Resize, or Orientation Change.
	onChange();
	$window.on('scroll resize orientationchange', function() {
		onChange();
	});

	function onChange() {
		if ($window.scrollTop() > 0 && $hero_btn.css('display') != 'none') {
			$hero_btn.fadeOut(400);
		} else if ($window.scrollTop() == 0 && $hero_btn.css('display') === 'none') {
			$hero_btn.fadeIn(400);
		}

		loadSections();
		loadTimeline();
		calcScrollProgress();
		updateActiveSection();
		updateStickyContent();
	}

	// Load Sections when in view.
	function loadSections() {
		$sections.each(function(i, el) {
			if ($sections[i] == null) return true;

			var el = $(el);

			if (el.visible(true, loadOffset) && el.data('animated') == false) {
				if (el.below(loadOffset)) {
					el.toggleClass('slide-up', $(this).visible(true, loadOffset)); // Below the center of the screen.
					el.data('animated', true);
				} else {
					el.toggleClass('slide-down', $(this).visible(true, loadOffset)); // Above the center of the screen.
					el.data('animated', true);
				}
			} else if (!el.visible(true, 0) && el.data('animated') == true) {
				if (this.classList.contains('slide-up')) {
					el.toggleClass('slide-up', !$(this).visible(true, -loadOffset));
				} else if (this.classList.contains('slide-down')) {
					el.toggleClass('slide-down', !$(this).visible(true, -loadOffset));
				}
				el.data('animated', false);
				el.css('opacity', '0');
			}
		});
	}

	// Load Timeline Nodes when in view.
	function loadTimeline() {
		if (!timelineLoaded && $timeline.visible(true, loadOffset)) {
			$timelineNodes.each(function(i, el) {
				if ($timelineNodes[i] == null) return true;

				var el = $(el);

				if (el.visible(true, loadOffset) && el.data('animated') == false) {
					if (window.innerWidth <= 768) {
						// If we're on a mobile device.
						el.addClass('slide-left');
						el.data('animated', true);
						$timelineNodes.nullifyElement(el);
						return true;
					}

					if (i % 2 == 0) {
						// Slide left or right according to array index.
						el.addClass('slide-right');
					} else {
						el.addClass('slide-left');
					}
					el.data('animated', true);
					$timelineNodes.nullifyElement(el);
					return true;
				}
			});

			if ($timelineNodes.length == 0) {
				timelineLoaded = true;
			}
		}
	}

	// Calculate Page Scroll Progress.
	function calcScrollProgress() {
		let h = document.documentElement,
			b = document.body,
			top = 'scrollTop',
			height = 'scrollHeight';
		let progress = parseInt((h[top] || b[top]) / ((h[height] || b[height]) - h.clientHeight) * 100);

		$progress.css('width', progress + '%');
		$progress.attr('aria-valuenow', progress);
	}

	// Update Active Section.
	function updateActiveSection() {
		let fromTop = window.innerHeight / 2 + window.pageYOffset;

		$navLinks.forEach((link) => {
			let section = document.querySelector(link.hash);

			if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
				link.classList.add('active');
			} else {
				link.classList.remove('active');
			}
		});
	}

	// Sticky Content.
	function updateStickyContent() {
		var stickyHeight = 0;
		$sticky.each(function() {
			stickyHeight += $(this).outerHeight();
		});
		const stickyTop = $sticky.offset().top;

		updateSticky();
		$window.on('scroll', updateSticky);

		function updateSticky() {
			//LOGIC FOR FIXED STICKY NAVBAR
			if ($window.scrollTop() - 25 > 0) {
				$sticky.addClass('active');
			} else {
				$sticky.removeClass('active');
			}

			// LOGIC FOR NON-FIXED STICKY NAVBAR if ($window.scrollTop() - 1 >=
			// stickyTop) {$body.css("padding-top", stickyHeight + "px");
			// $sticky.addClass("active");} else {$body.css("padding-top", 0);
			// $sticky.removeClass("active");
			// }
		}
	}

	// Smooth Scroll to Section.
	$('a[href^="#"]').on('click', function(e) {
		e.preventDefault();

		var targetPos = $(this.hash).offset().top + $(this).height() / 2;
		$root.animate(
			{
				scrollTop: targetPos - $nav.height(),
			},
			'fast',
			'swing',
		);

		window.location.hash = this.hash;
	});

	// Toggle Color-Mode.
	const toggleColorMode = (e) => {
		if (e.currentTarget.classList.contains('light--hidden')) {
			document.documentElement.setAttribute('color-mode', 'light');
			localStorage.setItem('color-mode', 'light');
			return;
		}
		document.documentElement.setAttribute('color-mode', 'dark');
		localStorage.setItem('color-mode', 'dark');
	};

	const toggleColorButtons = document.querySelectorAll('.color-mode-btn');
	toggleColorButtons.forEach((btn) => {
		btn.addEventListener('click', toggleColorMode);
	});

	// Text Cycler.
	const words = [
		'experiences.',
		'games.',
		'worlds.',
		'applications.',
		'simulations.',
		'products.',
		'tools.',
		'brands.',
		'solutions.',
	];

	// Returns the next word in the array.
	function getNextWord() {
		wordIndex = (wordIndex + 1) % words.length;
		return text.replace(/null/, words[wordIndex]);
	}

	// Cyclers the "cycler" element with animation.
	function cycleText() {
		var txt = getNextWord();
		var cycler = document.getElementById('cycler');
		cycler.className = 'cycle-out';
		setTimeout(function() {
			cycler.className = 'cycle-in';
			cycler.innerHTML = txt;
		}, 1000);
	}

	var cycler = (document.getElementById('cycler').innerHTML = words[0]);
	setInterval(cycleText, 5000);
});
