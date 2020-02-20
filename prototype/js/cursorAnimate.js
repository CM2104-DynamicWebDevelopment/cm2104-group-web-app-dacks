$(document).mousemove(function (e)
{
    $('#image').offset({
        left: e.pageX,
        top: e.pageY + 20
    });
});
