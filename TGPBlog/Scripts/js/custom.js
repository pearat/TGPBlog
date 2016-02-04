


/*=========================*/
/*====main navigation hover dropdown====*/
/*==========================*/
jQuery(document).ready(function () {

    jQuery('.js-activated').dropdownHover({
        instantlyCloseOthers: false,
        delay: 0
    }).dropdown();

});

//main flex slider
$(window).load(function () {
    $('.main-flex-slider').flexslider({
        animation: "fade",
        controlNav: false
    });
});

//thumb slider
$(window).load(function () {
    $('.thumb-slider').flexslider({
        animation: "slide",
        controlNav: false
    });
});


$(document).ready(function () {
    $.each($('td').not(':empty'), function (i, v) {
        var count = parseInt($(this).text().length);
        var maxChars = 200;
        if (count > maxChars) {
            var str = $(this).text();
            var trimmed = str.substr(0, maxChars);
            $(v).text(trimmed + '...');
        }

    });
});



// jQuery(document).ready(function () {

//$('.blog-grid').masonry({
//    // options
//    itemSelector: '.blog-item',
//    columnWidth: 1
//});

// });