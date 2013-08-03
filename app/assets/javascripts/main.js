$(document).ready(function(){
	
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

});