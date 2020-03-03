// When the mouse moves on the document make the virus image follow it
$(document).mousemove(function (e)
{
	// Set the position of the virus image based on the coordinates of the mouse
    $('#image').offset({
        left: e.pageX + 10,
        top: e.pageY - 20
    });
});