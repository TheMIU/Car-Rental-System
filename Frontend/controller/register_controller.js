let nextUserID = "";

// get logged customer data
function getLoggedCustomer(loginId) {
    $.ajax({
        url: baseURL + 'user/' + loginId,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log(response.data)
            $('#LoggedLabel').text(response.data.userId+' : '+response.data.name);
            $('#cus_name').val(response.data.name);
            $('#cus_address').val(response.data.address);
            $('#cus_contact').val(response.data.contact);
            $('#cus_email').val(response.data.email);
        },
        error: function (error) {
            console.log("Error fetching data: " + error);
        }
    });
}

// get next id
$("#registerBtn").on("click", function () {
    $.ajax({
        type: "GET",
        url: baseURL + "user/next_id",
        success: function (response) {
            nextUserID = response.data;
            console.log(nextUserID)
            $('#registerModalLabel').text('Register : '+nextUserID);
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

//////////////////////////////
// password field eye toggle
const $passwordInput = $('#password');
const $cus_passwordInput = $('#cus_password');
const $togglePasswordButtons = $('.toggle-password');

$togglePasswordButtons.click(function () {
    if ($passwordInput.attr('type') === 'password') {
        $passwordInput.attr('type', 'text');
        $cus_passwordInput.attr('type', 'text');
        $(this).html('<i class="fas fa-eye-slash"></i>');
    } else {
        $passwordInput.attr('type', 'password');
        $cus_passwordInput.attr('type', 'password');
        $(this).html('<i class="fas fa-eye"></i>');
    }
});

/////////////// update
$("#update").click(function () {
    let name = $('#cus_name').val();
    let address = $('#cus_address').val();
    let contact = $('#cus_contact').val();
    let email = $('#cus_email').val();

    let customer = {
        "userId": loginId,
        "name": name,
        "address": address,
        "contact": contact,
        "email": email,
    }
    console.log(customer);

    let b = confirm("Do you want to Update " + loginId + " ?");

    if (b) {
        $.ajax({
            url: baseURL + 'user',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(customer),

            success: function (res) {
                alert(res.message);
                getLoggedCustomer(loginId);
                $('#Logged').modal('hide');
            },
            error: function (error) {
                alert(error.responseJSON.message);
            }
        });
    }
});