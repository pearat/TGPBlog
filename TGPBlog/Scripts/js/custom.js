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
    var commentId = 0;
    $('#delCommentModal').on('shown.bs.modal', function (e) {
        var j = $(e.relatedTarget).data('id');
        console.log(' commentId j: '+j);
        commentId = j;
    });

    $('#deleteConfirmed').click(function (e) {

        var urlString = '../../Posts/DeletePostComment/' + commentId;
        console.log('In $(#deleteConfirmed) urlString: ' + urlString);

        $.ajax({
            type: "POST",
            url: urlString,
            data: { id: commentId },
            cache: false,
            success: function (result) {
                console.log(result.name);
                success(result); 
            },
            error: function (e) {
                console.log("error" + e);
                success(e);
            }
        });

        //$('#divPartialView').load('@Url.Action("Details", "Posts", )')
        //$.ajax({
        //    url: '@Url.Action("GetPartialDiv", "Home")',
        //    data: { id: $(this).val() /* add other additional parameters */ },
        //    cache: false,
        //    type: "POST",
        //    dataType: "html",
        //    success: function (data, textStatus, XMLHttpRequest) {
        //        SetData(data);
        //    }
        //});

        //function success(result) {
        //    $("#divPartialView").html(result);
        //    // $('#divPartialView').load("@Url.Action()");

        //}
    });
    $('#delCommentModal').on('hidden.bs.modal', function () {
        window.location.reload(true);
    })
});


// e.preventDefault();

// console.log('Inside deleteConfirmed, commentId: ' + commentId);


//var targetUrl = $(this).attr("href");
//console.log('targetUrl: ' + targetUrl);
//var urlString = '@Url.Action("Delete","DeletePostComment", "Posts", { id:'+commentId+ '})';

//$.get(urlString);

//var myData = {};
//myData["id"] = commentId;

////alert('commentId: ' + commentId);


////@Html.ActionLink("Delete","DeletePostComment", new { id = com.id, slug = @Slug },

