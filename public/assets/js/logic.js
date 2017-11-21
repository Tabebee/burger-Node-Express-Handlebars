$(function () {
    //  Put all tasks in functions
    function updateDevouredBurgers() {

    };  //End updateDevouredBurgers

    function addNewBurger(burgerName) {
        $.ajax("/api/burgers", {
            type: "POST",
            data: burgerName
        }).then(
            function () {
                console.log("Added New Burger " + burgerName);
                location.reload();
            }
        );
    };  //End addNewBurger

    function deleteBurger() {

    };  //End deleteBurger

//     On click "Add Me"
    $(".addMeButton").on("click", function () {
        var burgerName = $("#newBurger").val().trim();
        addNewBurger(burgerName);
    });




//    End jqeury function
});