// Execute the JS when the page DOM is ready
$( document ).ready(function() 
{
    $ans = "2 Metres"; // Quiz answer

    // When an option in the quiz is clicked, check the answer
    $("label").on('click',function () 
    {
        $("#answer").html($(this).checking($("#"+this.id).text()));   
    });

    // Function to check if the answer to the quiz is correct
    $.fn.checking = function(ck) 
    {
        // If the answer is incorrect return incorrect otherwise return correct
        if (ck != $ans)
            return "Incorrect".fontcolor("red");
        else 
            return "Correct".fontcolor("green");
    };
    
    // When the modal is hidden or closed, clear the quiz
    $(".modal").on("hidden.bs.modal", function()
    {
        $("#answer").html("");
    });
});

