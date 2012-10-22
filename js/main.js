(function() {
    $('div.search input').focus(function() {
            $(this).next().hide();
        $(this).animate({
            width:'+=100'
        }, 'fast');
    });

    $('div.search input').blur(function() {
        $(this).next().show();
        $(this).animate({
            width:'-=100'
        }, 'fast');
    });

    $('div.search input').keyup(function() {
        var _value = $(this).val();

        if (!_value.length)
            $(this).next().show();
    });

    $('div.search-value').click(function() {
        $(this).prev().focus();
    });

    $('div.search input').keydown(function() {
        $(this).next().hide();
    });

    $('#lenta-left div,#lenta-right div').mousedown(function() {
        $(this).addClass('active');
    });

    $('div.bet-item').toggle(function() {
        $(this).find('div.bet-content')
            .slideDown('fast');
        $(this).find('div.bet-item-more')
            .removeClass('bet-item-more')
            .addClass('bet-item-less');
    }, function() {
        $(this).find('div.bet-content')
            .slideUp('fast');
        $(this).find('div.bet-item-less')
            .removeClass('bet-item-less')
            .addClass('bet-item-more');
    });

    $('div.bet-content').click(function(event) {
        event.stopPropagation();
    });

    $('#menu-categories > div').click(function() {
        $('#menu-categories > div').removeClass('active').find('div.menu-subitem').hide();

        $(this).addClass('active').find('div.menu-subitem').slideDown('fast');

    });

    $('div.menu-subitem-middle div').click(function(event) {
        event.stopPropagation();
        $('div.menu-subitem-middle div').removeClass('active');

        $(this).addClass('active');
    });


    //tabs
    $('div.coef-tabs').tabs();
 })();
