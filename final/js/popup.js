$(document).ready(function() {
    setTimeout(function() {
        $("#pop").text("Remember to wash your hands!");
        $("#dialog").dialog({
            autoOpen: false,
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "explode",
                duration: 1000
            }
        });

        $("#opener").ready(function() {
            $("#dialog").dialog("open");
					setTimeout(function(){
			$("#mydialog").dialog('close')
		}, 3000);
        });

}, 5000);
});
