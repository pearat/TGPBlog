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
/*
$(document).ready(function () {

    $("#dialog").dialog({
        modal: true,
        bgiframe: true,
        width: 500,
        height: 200,
        autoOpen: false
    });


    $(".confirmLink").click(function (e) {

        e.preventDefault();
        var theHREF = $(this).attr("href");

        $("#dialog").dialog('option', 'buttons', {
            "Confirm": function () {
                window.location.href = theHREF;
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        });

        $("#dialog").dialog("open");

    });

});
*/

$(document).ready(function () {
    $("#dialog").dialog({
        autoOpen: false,
        modal: true
    });
});

$(".confirmLink").click(function (e) {
    e.preventDefault();
    var targetUrl = $(this).attr("href");

    $("#dialog").dialog({
        buttons: {
            "Confirm": function () {
                window.location.href = targetUrl;
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dialog").dialog("open");
});

$(document).ready(function () {

    $('#delCommentModal').on('shown.bs.modal', function () {
        $(this).find('input:first').focus();
    });
    $('#numFactorial').keyup(function (event) {
        if (event.keyCode == '13') {
            $('#factorialBtn').click();
        }
    });
    $('#factorialBtn').click(function () {
        var numFact = $(numFactorial).val();
        numFact = factorial(numFact);
        $('#factorialResult').html("<p>n! = " + addCommas(numFact) + "<\p>");
        $('#factorialResult').css('visibility', 'visible');
    });

});

