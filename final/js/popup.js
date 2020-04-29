$( document ).ready(function()
{
    setTimeout(function()
    {
        $("#wash").html("Remember to wash your hands")
        $("#snackbar").show();
        setTimeout(function(){ $("#snackbar").hide(); }, 3000);
    }, 5000);    
});
