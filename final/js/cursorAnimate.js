var activated = false;
var input = "";

// Enable the easter egg
function enableEasterEgg()
{
    alert("Congratulations, you've found the easter egg!\n\nYour mouse cursor will turn into a human and will get followed by a virus when moved.\n\nPress any key to stop.");
    $('*').css('cursor', 'url(img/human.png),auto');
    $('#image').show();

    // When the mouse moves on the document make the virus image follow it
    $(document).mousemove(function (e)
    {
        // Set the position of the virus image based on the coordinates of the mouse
        $('#image').offset({
            left: e.pageX,
            top: e.pageY + 40
        });
    });
}

// Disable the easter egg and return the cursor back to its default
function disableEasterEgg()
{
    $('#image').hide();
    $('*').css('cursor', 'default');
}

function activateEasterEgg()
{
    var secret = "78677986"; // ncov in ASCII

    // If the ncov is entered and the easter egg isn't enabled, enable it
    if (input == secret && !activated)
    {
        enableEasterEgg();
        activated = true;
    }

    // If any other key is pressed, disable the easter egg
    else
    {
        disableEasterEgg();
        activated = false;
    }
}

// Handle keyup events
$(document).keyup(function (e)
{
    var timer;

    // Get the keys entered
    input += e.which;

    // Clear the timer
    clearTimeout(timer);

    // Set the timers timeout to 1.5s
    timer = setTimeout(function () { input = ""; }, 1500);

    // If entered within 1.5s activate the easter egg
    activateEasterEgg();
});

// When the document loads, hide the virus image
$(document).ready(function ()
{
    $('#image').hide();
});
