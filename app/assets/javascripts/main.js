$(document).ready(function(){

	jQuery('#loginbox div.loginbox-close').on('click', function() {
		$.fancybox.close();
	})

	
	/* Search block*/
	$("div.search input").placeholder();

	$("div.search input").on("focus", function(){
		$(this).animate({
			width: '200px'
		}, 200);
	});

	$("div.search input").on("blur", function(){
		$(this).animate({
			width: '100px'
		}, 200);
	});

	/* Carousel pastevents*/
	$("ul.pastevents-items-carousel").bxSlider({
		slideWidth: 90,
		startSlide: 1,
		maxSlides: 9,
		minSlides: 1,
    slideMargin: 3,
    moveSlides: 1,
    auto: true,
    pager: false
	});

	/* event */
	$('div.event div.event-title').on('click', function() {
		if ( $(this).next().is(':visible') ) {
			$(this).next().slideUp();
			$(this).closest('div.event').find('div.event-hide-full')
				.removeClass('event-hide-full')
				.addClass('event-show-full');
		} else {
			$(this).next().slideDown();
			$(this).closest('div.event').find('div.event-show-full')
				.removeClass('event-show-full')
				.addClass('event-hide-full');
		}
	});
});