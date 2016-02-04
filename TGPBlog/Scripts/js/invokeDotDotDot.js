$(document).ready(function () {
    $(".preview_wrapper").dotdotdot({
        /*	The text to add as ellipsis. */
        ellipsis: '... ',

        /*	How to cut off the text/html: 'word'/'letter'/'children' */
        wrap: 'word',

        /*	Wrap-option fallback to 'letter' for long words */
        fallbackToLetter: true,

        /*	jQuery-selector for the element to keep and put after the ellipsis. */
        after: null,

        /*	Whether to update the ellipsis: true/'window' */
        watch: false,

        /*	Optionally set a max-height, can be a number or function.
			If null, the height will be measured. */
        height: null,

        /*	Deviation for the height-option. */
        tolerance: 0,

        /*	Callback function that is fired after the ellipsis is added,
			receives two parameters: isTruncated(boolean), orgContent(string). */
        //callback: function (isTruncated, orgContent) { },

        lastCharacter: {

            /*	Remove these characters from the end of the truncated text. */
            remove: [' ', ',', ';', '.', '!', '?'],

            /*	Don't add an ellipsis if this array contains 
				the last character of the truncated text. */
            noEllipsis: []
        }
    });
});

/* FURTHER DOCUMENTATION

Need to update the ellipsis manually? Trigger the "update"-event.

$("#button").click(function() {
    $("#wrapper").trigger("update");
});
Want to know if the text got truncated? Trigger the "isTruncated"-event.

$("#button").click(function() {
    //	by using the return-value...
    var isTruncated = $("#wrapper").triggerHandler("isTruncated");
    if ( isTruncated ) {
        //	do something
    }
	
    //	...or by using the callback function
    $("#wrapper").trigger("isTruncated", function( isTruncated ) {
        if ( isTruncated ) {
            //	do something
        }
    });
});

Need the original content? Trigger the "originalContent"-event.

$("#button").click(function() {
    //	by using the return-value...
    var content = $("#wrapper").triggerHandler("originalContent");
    $("#foo").append( content );
	
    //	...or by using the callback function
    $("#wrapper").trigger("originalContent", function( content ) {
        $("#foo").append( content );
    });
});
If you want to destroy the ellipsis, trigger the "destroy"-event.

$("#button").click(function() {
    $("#wrapper").trigger("destroy");
});
Please note that all custom events have been namespaced to ".dot", so to prevent interfering with other scripts, triggering an event would best be done like this:

$("#wrapper").trigger("update.dot");
*/