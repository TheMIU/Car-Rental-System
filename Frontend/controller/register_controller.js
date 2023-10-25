const baseURL = 'http://localhost:8080/Backend_war/';
let nextUserID = "";
let logged = false;

// Login
$("#loginBtn").on("click", function () {
    var formData = $('#loginForm').serialize();

    $.ajax({
        type: "POST",
        url: baseURL + "login/check",
        data: formData,

        success: function (response) {
            console.log(response.data)
            if(response.data){
                alert("Login success !");
                logged = true;
                profileChange();
                $('#login').modal('hide');

                // Clear register form
                $("#loginForm").find("input:not([type='submit'])").val("");
            }else {
                alert("Login failed !");
            }
        },
        error: function (error) {
            alert('failed : ' + error.responseJSON.message);
        }
    });
});

// get next id
$("#registerBtn").on("click", function () {
    $.ajax({
        type: "GET",
        url: baseURL + "user/next_id",
        success: function (response) {
            nextUserID = response.data;
        },
        error: function (error) {
            alert('failed : ' + error.responseJSON.message);
        }
    });
});

// submit form
$("#registerForm").submit(function (e) {
    e.preventDefault();

    if ($('#registerForm')[0].checkValidity()) { // check form filled or not
        // submit form
        const formData = new FormData(this);
        formData.set('type', 'customer');
        formData.set('loginId', nextUserID);
        formData.set('userId', nextUserID);

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

