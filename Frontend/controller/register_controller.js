const baseURL = 'http://localhost:8080/Backend_war/';

$("#registerForm").submit(function (e) {
    e.preventDefault();

    if ($('#registerForm')[0].checkValidity()) { // check form filled or not
        // submit form
        const formData = new FormData(this);

        $.ajax({
            type: "POST",
            url: baseURL + 'user',
            data: formData,
            processData: false,
            contentType: false,

            success: function (response) {
                console.log(response.message);
            },
            error: function (error) {
                alert('failed : ' + error.responseJSON.message);
            }
        });

        // show the second modal
        $('#registerSubmitted').modal('show');
        $('#registerInfo').modal('hide');

        // Clear register form
        $("#registerForm").find("input:not([type='submit'])").val("");


    } else {
        // Required fields are not filled, display an error message
        alert('Please fill in all required fields before submitting.');
    }
});

