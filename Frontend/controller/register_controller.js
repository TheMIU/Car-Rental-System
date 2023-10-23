$(document).ready(function () {
    const baseURL = 'http://localhost:8080/Backend_war/';

    $("#registerInfo form").submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: "POST",
            url: baseURL + 'user',
            data: formData,
            success: function (response) {
                alert(response.message);
            },
            error: function (error) {
                alert('failed : '+error.responseJSON.message);
            }
        });
    });
});
