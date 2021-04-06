/* ========================================================================= */
/*	Page Preloader
/* ========================================================================= */

$(window).on('load', function () {
	$('.preloader').fadeOut(100);
});

// Auto close Navbar when click on link
$('.navbar-collapse a').click(function(){
	$(".navbar-collapse").collapse('hide');
});

jQuery(function ($) {
	"use strict";

	/* ========================================================================= */
	/*	lazy load initialize
	/* ========================================================================= */

	const observer = lozad(); // lazy loads elements with default selector as ".lozad"
	observer.observe();

	/* ========================================================================= */
	/*	Magnific popup
	/* =========================================================================  */
	$('.image-popup').magnificPopup({
		type: 'image',
		removalDelay: 160, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function () {
				// just a hack that adds mfp-anim class to markup
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		closeOnContentClick: true,
		midClick: true,
		fixedContentPos: false,
		fixedBgPos: true
	});

	/* ========================================================================= */
	/*	Portfolio Filtering Hook
	/* =========================================================================  */

	var containerEl = document.querySelector('.shuffle-wrapper');
	if (containerEl) {
		var Shuffle = window.Shuffle;
		var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
			itemSelector: '.shuffle-item',
			buffer: 1
		});

		jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
			var input = evt.currentTarget;
			if (input.checked) {
				myShuffle.filter(input.value);
			}
		});
	}

	/* ========================================================================= */
	/*	Testimonial Carousel
	/* =========================================================================  */

	$("#testimonials").slick({
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 4000
	});

	/* ========================================================================= */
	/*	animation scroll js
	/* ========================================================================= */

	var html_body = $('html, body');
	$('nav a, .page-scroll').on('click', function () { //use page-scroll class in any HTML tag for scrolling
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				html_body.animate({
					scrollTop: target.offset().top - 50
				}, 1500, 'easeInOutExpo');
				return false;
			}
		}
	});

	// easeInOutExpo Declaration
	jQuery.extend(jQuery.easing, {
		easeInOutExpo: function (x, t, b, c, d) {
			if (t === 0) {
				return b;
			}
			if (t === d) {
				return b + c;
			}
			if ((t /= d / 2) < 1) {
				return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			}
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	});

	/* ========================================================================= */
	/*	counter up
	/* ========================================================================= */
	function counter() {
		var oTop;
		if ($('.count').length !== 0) {
			oTop = $('.count').offset().top - window.innerHeight;
		}
		if ($(window).scrollTop() > oTop) {
			$('.count').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {
					duration: 1000,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
					}
				});
			});
		}
	}
	$(window).on('scroll', function () {
		counter();
	});

	var event = $(".event *");
	if(event.length>0){
		showLive();
	}

});

/* ========================================================================= */
/*	Download event
/* ========================================================================= */
function downloadEvent(){
	var subject = $('#subject').val();
	var description = $('#description').val();
	description = 'Please join here ' + description;
	//description = $('.post-single-content').html();
	// description = description.replace(/\n/g , '\\n');
	// description = description.replace(/\r\n/g , '\\n');
	// description = description.replace(/<br>/g , '\\n');
	var location = $('#location').val();
	var begin = $('#start-date').val();
	var end = $('#end-date').val();
	var filename = $('#filename').val();
	if(filename==='')
		filename= subject;
	var cal = ics();
	cal.addEvent(subject, description, location, begin, end);
	//cal.addEvent(subject, description, location, begin, end); // yes, you can have multiple events :-)
	cal.download(filename)
}
function focusSearch(){
	if ($('.js-search').is(":focus")) {
		//do nothing
	}
	else{
		$('.js-search').focus();
	}
}

function showLive(){
	var now = new Date();
	var s = new Date($('.start-date').html());
	var e = new Date($('.end-date').html());

	var newTime = now.getHours()*60+now.getMinutes();
	var sTime = s.getHours()*60+s.getMinutes();
	var eTime = e.getHours()*60+e.getMinutes();

	// compare nowTime and dateTime
	if (s.getDate()== now.getDate()){
		if (newTime >= sTime && newTime <= eTime) {
			$('.announcement').css('display','block');
			//alert('Session is live')
		}
	}
}