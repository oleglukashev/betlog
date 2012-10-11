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
    });

    $('#lenta-left div,#lenta-right div').mousedown(function() {
        $(this).addClass('active');
    });
 })();
