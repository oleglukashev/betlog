$(document).ready(function(){
	
	/* Search block*/
	$("div.search input").placeholder();

	$("div.search input").on("focus", function(){
		$(this).attr("placeholder", "")
		$("div.search").removeClass("hide");
		$(this).animate({
			width: '250px'
		}, 200);
	});

	$("div.search input").on("blur", function() {
		$(this).attr("placeholder", "Введите команду...")
		$("div.search").addClass("hide");
		$(this).animate({
			width: '130px'
		}, 200);
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