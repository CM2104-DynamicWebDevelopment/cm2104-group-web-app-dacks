//start fucntion
$(document).ready(function() {
//set time for function to appear after 5 econds
    setTimeout(function() {
		//input the text inside the pop element
        $("#pop").text("Remember to wash your hands!");
        $("#dialog").dialog({
            autoOpen: false,
            show: {
				//show the box with animation
                effect: "blind",
                duration: 1000
            },
			//hide the box
            hide: {
                effect: "explode",
                duration: 1000
            }
        });
		//function that close after 3 seconds
        $("#opener").ready(function() {
            $("#dialog").dialog("open");
					setTimeout(function(){
			$("#mydialog").dialog('close')
		}, 3000);
        });

}, 5000);
});
//end fucntion