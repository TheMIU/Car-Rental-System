$(document).ready(function () {
    const baseURL = 'http://localhost:8080/Backend_war/';

    $("#registerInfo form").submit(function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        $.ajax({
            type: "POST",
            url: baseURL + 'user',
            data: formData,
            processData: false,
            contentType: false,

            success: function (response) {
                alert(response.message);
            },
            error: function (error) {
                alert('failed : ' + error.responseJSON.message);
            }
        });
    });
});
