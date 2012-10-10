(function() {
    $('div.search input').focus(function() {
        if ($(this).attr('placeholder') == '')
            return false;

        $(this).animate({
            width:'+=100'
        }, 'fast').attr('placeholder', '');
    });

    $('div.search input').blur(function() {
        $(this).animate({
            width:'-=100'
        }, 'fast').attr('placeholder', 'Search...');
    })
 })();
