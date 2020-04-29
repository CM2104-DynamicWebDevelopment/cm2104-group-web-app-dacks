$( document ).ready(function() 
{
 
    $ans = "2 Metres";

    $("label").on('click',function () 
    {
        $("#answer").html($(this).checking($("#"+this.id).text()));   
    });


    $.fn.checking = function(ck) 
    {

        if (ck != $ans)
            return "Incorrect".fontcolor("red");
        else 
            return "Correct".fontcolor("green");
    };
    
    $(".modal").on("hidden.bs.modal", function()
    {
        $("#answer").html("");
    });
});

