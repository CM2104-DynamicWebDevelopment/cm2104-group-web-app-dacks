$(document).mousemove(function (e)
{
    $('#image').offset({
        left: e.pageX + 10,
        top: e.pageY - 20
    });
});
