$(document).ready(function () {
    $("#registerInfo form").submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

        // Send the form data to the server
        $.ajax({
            type: "POST",
            url: "",
            data: formData,
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.error("AJAX error:", error);
            }
        });
    });
});
