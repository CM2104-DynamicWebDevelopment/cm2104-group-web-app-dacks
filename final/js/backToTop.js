// Run once the page DOM is ready to execute JS
$(document).ready(function()
{
	// Scroll event
	$(window).scroll(function () 
	{
		// Choose a smooth transition to scroll back up with. If the page is scrolled more than 50px fade it in otherwise fade it out
		if ($(this).scrollTop() > 50) 
			$('#back-to-top').fadeIn();
		else
			$('#back-to-top').fadeOut();
	});

	// When the go back to top button is clicked, scroll back to the top of the body
	$('#back-to-top').click(function () 
	{
		$('body,html').animate({
			scrollTop: 0
		}, 400);
		return false;
	});
});